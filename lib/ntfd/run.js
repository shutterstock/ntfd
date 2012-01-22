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

  var lastResult = null
    , results = {}

  var testOptions = {
    testStart: function(name) {
      lastResult = results[name] = { assertions: [], ok: true }
    },
    log: function(a) {
      lastResult.assertions.push({
        method: a.method,
        message: a.message,
        ok: !a.failed(),
      })
      if (a.failed()) lastResult.ok = false
    },
    testDone: function(name, test) {
      lastResult.duration = test.duration
    },
  }

  nodeunit.runModule(name, test, testOptions, function(err, suite) {
    var data = {
      name: name,
      duration: suite.duration,
      failures: suite.failures(),
      passes: suite.passes(),
      results: results,
    }
    data.ok = data.failures == 0
    data.agent = global.options.agent
    global.events.emit('test', data)
    callback(null, data)
  })
}
