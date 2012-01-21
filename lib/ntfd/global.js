var events = require('events')
  , util = require('util')

function EventEmitter() { events.EventEmitter.call(this) }
util.inherits(EventEmitter, events.EventEmitter)

exports.events = new EventEmitter()
exports.options = null
exports.suite = null
