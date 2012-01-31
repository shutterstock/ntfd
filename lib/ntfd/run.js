var nodeunit = require('nodeunit')
  , global = require('./global')

exports.test = function(/* name, test, [options], callback */) {
  var name = arguments[0]
    , test = arguments[1]
    , options = {}
    , callback = null

  if (arguments.length == 4) {
    options = arguments[2]
    callback = arguments[3]
  } else {
    callback = arguments[2]
  }

  var lastTest = null
    , tests = {}
    , meta = {}

  var testOptions = {
    testStart: function(name) {
      meta.currentTest = name
      lastTest = tests[name] = {
        ok: true,
        assertions: [],
        passes: 0,
        failures: 0,
      }
    },
    log: function(a) {
      var ok = !a.failed()
      lastTest.assertions.push({
        method: a.method,
        message: a.message,
        ok: ok,
      })
      if (!ok) {
        lastTest.ok = false
        lastTest.failures++
      } else {
        lastTest.passes++
      }
    },
    testDone: function(name, test) {
      delete meta.currentTest
      lastTest.duration = test.duration
    },
  }

  var setUp = test.setUp

  test.setUp = function(cb) {
    this.meta = meta
    if (setUp) {
      setUp.call(this, cb)
    } else {
      cb()
    }
  }

  nodeunit.runModule(name, test, testOptions, function(err, suite) {
    var data = {
      name: name,
      duration: suite.duration,
      failures: suite.failures(),
      passes: suite.passes(),
      tests: tests,
    }
    data.ok = data.failures == 0
    data.agent = global.options.agent
    data.time = parseInt(new Date().getTime() / 1000)
    // merge meta
    if (typeof(meta) === 'object' && typeof(meta.test) === 'object') {
      for (var n in meta.test) {
        if (tests.hasOwnProperty(n)) {
          if (typeof(tests[n].meta) !== 'object') tests[n].meta = {}
          var result = tests[n].meta
            , testMeta = meta.test[n]
          for (var a in testMeta) {
            result[a] = testMeta[a]
          }
        }
      }
    }
    global.events.emit('test', data)
    callback(null, data)
  })
}
