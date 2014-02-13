var run = require('./run')
  , shared = require('./shared')

var loop = function(fn, options) {
  options = options || {}

  options.timeout = options.timeout !== undefined ? options.timeout :
    (shared.options.test.interval * 1000)

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
      if (err) console.log(err.message);
      loop(fn, options);
    })
  }, timeout)
}

exports.run = function() {
  Object.keys(shared.suite).forEach(function (name) {
    loop(function(cb) { run.suite(name, cb) }, { random: true })
  })
}
