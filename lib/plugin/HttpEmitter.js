var http = require('http')
  , https = require('https')
  , url = require('url')

var Plugin = module.exports = function(uri) {
  this.uri = uri = url.parse(uri)

  var opts = this.opts = {
    host: uri.hostname,
    port: uri.port,
    headers: { 'Content-Type': 'application/json' },
    path: (uri.pathname || '') + (uri.search || ''),
    method: 'POST',
  }

  if (!opts.port) {
    opts.port = uri.protocol == 'https:' ? 443 : 80
  }

  if (uri.auth) {
    opts.headers.Authorization = 'Basic ' + new Buffer(uri.auth).toString('base64')
  }
}

Plugin.prototype.setup = function(ntfd, cb) {
  var self = this

  self.log = ntfd.log

  ntfd.events.on('suite', function(suite) {
    self.handleSuite(suite)
  })
  cb()
}

Plugin.prototype.handleSuite = function(suite) {
  var self = this

  var req = this.uri.protocol == 'https:' ? https.request(this.opts) :
    http.request(this.opts)
  req.on('error', function(err) {
    self.log.error(err)
  })
  req.setHeader('Content-Length', JSON.stringify(suite).length);
  req.end(JSON.stringify(suite))
}
