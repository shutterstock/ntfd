module.exports = function(ntfd) {
  ntfd.events.on('test', function(test) {
    console.log(JSON.stringify(test))
  })
}
