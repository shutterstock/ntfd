var events = require('events')
  , util = require('util')

function EventEmitter() { events.EventEmitter.call(this) }
util.inherits(EventEmitter, events.EventEmitter)

function Logger() {
  this.level = 'error'
}
Logger.prototype.log = function(level, text) {
  if (this.levels[level] >= this.levels[this.level]) {
    util.log(text)
  }
}
Logger.prototype.debug = function(text) { this.log('debug', text) }
Logger.prototype.info = function(text) { this.log('info', text) }
Logger.prototype.warning = function(text) { this.log('warning', text) }
Logger.prototype.error = function(text) { this.log('error', text) }
Logger.prototype.levels = { debug: 0, info: 1, warning: 2, error: 3, none: 99 }

exports.events = new EventEmitter()
exports.options = null
exports.suite = null
exports.log = new Logger()
