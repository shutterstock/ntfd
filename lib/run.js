var runlib = require('./runlib')
  , shared = require('./shared')

exports.suite = function(name, callback) {
  var spawn = require('child_process').spawn

  var p = spawn(process.execPath, [runlib.path, name, shared.suite[name]])
    , stdout = []
    , stderr = []

  p.stdout.on('data', function(d) { stdout.push(d.toString('utf8')) })
  p.stderr.on('data', function(d) { stderr.push(d.toString('utf8')) })

  var fail = function(error) {
    if (!error) error = stderr.join('')
    callback(new Error(error))
  }

  p.on('exit', function(code) {
    if (code !== 0) return fail()

    try {
      var data = JSON.parse(stdout.join(''))
    } catch(err) {
      return fail()
    }

    if (typeof(data) !== 'object') return fail()

    data.agent = shared.options.agent
    data.version = shared.schemaVersion
    shared.events.emit('suite', data)
    callback(null, data)
  })

  p.stdin.end()
}
