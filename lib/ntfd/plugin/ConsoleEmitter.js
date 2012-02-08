var Plugin = module.exports = function(log) {
  this.log = log || function(d) { console.log(JSON.stringify(d)) }
}

Plugin.prototype.setup = function(ntfd, cb) {
  ntfd.events.on('suite', this.log)
  cb()
}
