var async = require('async')
  , fs = require('fs')
  , path = require('path')
  , periodic = require('./periodic')
  , plugin = require('./plugin')
  , shared = require('./shared')
  , utils = require('./utils')

var ntfd = module.exports = function(options) {
  setup(options)
  setupPlugin(options, function(err) {
    periodic.run()
  })
}

ntfd.version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version

ntfd.plugin = plugin

var setup = function(options) {
  shared.suite = utils.load(options.path)
  if (typeof(options) !== 'object') throw 'options must be an object'
  options.agent = options.agent || process.env.HOSTNAME
  if (typeof(options.agent) !== 'string') throw 'options.agent must be a string'
  options.plugin = options.plugin || [new plugin.ConsoleEmitter()]
  if (!Array.isArray(options.plugin)) throw 'options.plugin must be an array'
  options.test = options.test || {}
  if (typeof(options.test) !== 'object') throw 'options.test must be an object'
  options.test.interval = options.test.interval || 60
  if (typeof(options.test.interval) !== 'number') throw 'options.test.interval must be a number'
  shared.options = options
}

var setupPlugin = function(options, cb) {
  var work = []
  options.plugin.forEach(function(e) {
    work.push(function(cb) {
      e.setup(shared, cb)
    })
  })
  async.parallel(work, cb)
}
