var nodeunit = require('nodeunit')

exports.path = __filename

exports.suite = function(name, path, callback) {
  var lastTest = null
    , tests = {}
    , meta = {}

  var options = {
    testStart: function(name) {
      meta.currentTest = name
      lastTest = tests[name] = {
        ok: true,
        assertions: [],
        pass: 0,
        fail: 0,
      }
    },
    log: function(a) {
      var ok = !a.failed()
        , data = { method: a.method, ok: ok }
      data.name = typeof(a.message) === 'object' ? a.message.message : a.message
      if (!ok) {
        a = nodeunit.utils.betterErrors(a)
        data.stack = a.error.stack
      }
      lastTest.assertions.push(data)
      if (!ok) {
        lastTest.ok = false
        lastTest.fail++
      } else {
        lastTest.pass++
      }
    },
    testDone: function(name, test) {
      delete meta.currentTest
      lastTest.duration = test.duration
    },
  }

  var suite = require(path)
    , setUp = suite.setUp

  suite.setUp = function(cb) {
    this.meta = meta
    if (setUp) {
      setUp.call(this, cb)
    } else {
      cb()
    }
  }

  nodeunit.runModule(name, suite, options, function(err, suite) {
    if (err) return callback(err)
    var data = {
      name: name,
      duration: suite.duration,
      fail: suite.failures(),
      pass: suite.passes(),
      tests: tests,
    }
    data.ok = data.fail == 0
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
    callback(null, data)
  })
}

if (require.main === module) {
  var argv = process.argv

  exports.suite(argv[2], argv[3], function(err, data) {
    console.log(JSON.stringify(data))
  })
}
