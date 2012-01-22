var async = require('async')
  , fs = require('fs')
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
  options.agent = options.agent || process.env.HOSTNAME
  if (typeof(options.agent) !== 'string') throw 'options.agent must be a string'
  options.plugin = options.plugin || [new plugin.ConsoleEmitter()]
  if (!Array.isArray(options.plugin)) throw 'options.plugin must be an array'
  options.test = options.test || {}
  if (typeof(options.test) !== 'object') throw 'options.test must be an object'
  options.test.timeout = options.test.timeout || 60
  if (typeof(options.test.timeout) !== 'number') throw 'options.test.timeout must be a number'
  global.options = options
}

var setupPlugin = function(options, cb) {
  var work = []
  options.plugin.forEach(function(e) {
    work.push(function(cb) {
      e.setup(global, cb)
    })
  })
  async.parallel(work, cb)
}

exports.run = function(suite, options) {
  setupSuite(suite)
  setupOptions(options)
  setupPlugin(options, function(err) {
    periodic.run()
  })
}
