var fs = require('fs')
  , global = require('./global')
  , periodic = require('./periodic')
  , plugin = require('./plugin')

exports.version = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'))['version']

exports.plugin = plugin

var setupSuite = function(suite) {
  if (typeof(suite) !== 'object') throw 'suite must be an object'
  global.suite = suite
}

var setupOptions = function(options) {
  if (typeof(options) !== 'object') throw 'options must be an object'
  options.plugin = options.plugin || [plugin.consoleEmitter]
  if (!Array.isArray(options.plugin)) throw 'options.plugin must be an array'
  options.test = options.test || {}
  if (typeof(options.test) !== 'object') throw 'options.test must be an object'
  options.test.timeout = options.test.timeout || 60
  if (typeof(options.test.timeout) !== 'number') throw 'options.test.timeout must be a number'
  global.options = options
}

var setupPlugin = function(options) {
  if (Array.isArray(options.plugin)) {
    options.plugin.forEach(function(e) {
      e(global)
    })
  }
}

exports.run = function(suite, options) {
  setupSuite(suite)
  setupOptions(options)
  setupPlugin(options)
  periodic.run()
}
