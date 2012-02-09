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
      failures: suite.failures(),
      passes: suite.passes(),
      tests: tests,
    }
    data.ok = data.failures == 0
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
