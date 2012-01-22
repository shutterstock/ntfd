var global = require('./global')
  , run = require('./run')

var loop = function(fn, options) {
  options = options || {}

  options.timeout = options.timeout != undefined ? options.timeout :
    (global.options.test.interval * 1000)

  // don't loop if <= zero
  if (!options.timeout || options.timeout < 0) return

  var timeout = options.timeout

  // add some randomness to the first run
  if (options.random) {
    timeout = Math.floor(Math.random() * timeout)
    delete options.random
  }

  setTimeout(function() {
    fn(function(err) {
      loop(fn, options)
    })
  }, timeout)
}

exports.run = function() {
  for (var name in global.suite) {
    (function(name, suite) {
      loop(function(cb) { run.test(name, suite, cb) }, { random: true })
    })(name, global.suite[name])
  }
}
