var ntf = require('ntf')
  , ntfd = require('ntfd')

var suite = ntf.utils.load(__dirname + '/tests')

var options = {
  //plugin: [new ntfd.plugin.HttpEmitter('http://localhost:8000')],
  test: {
    interval: 10,
  },
}

ntfd.run(suite, options)
