var nodeunit = require('nodeunit')
  , global = require('./global')

exports.suite = function(/* name, [options], callback */) {
  var name = arguments[0]
    , options = {}
    , callback = null

  if (arguments.length == 3) {
    options = arguments[1]
    callback = arguments[2]
  } else {
    callback = arguments[1]
  }

  var lastTest = null
    , tests = {}
    , meta = {}

  var runOptions = {
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

  var suite = require(global.suite[name])
    , setUp = suite.setUp

  suite.setUp = function(cb) {
    this.meta = meta
    if (setUp) {
      setUp.call(this, cb)
    } else {
      cb()
    }
  }

  nodeunit.runModule(name, suite, runOptions, function(err, suite) {
    if (err) return callback(err)
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
    global.events.emit('suite', data)
    callback(null, data)
  })
}
