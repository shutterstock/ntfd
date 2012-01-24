var ntf = require('ntf')
  , ntfd = require('ntfd')

var suite = ntf.utils.load(__dirname + '/tests')

var options = {
  //plugin: [new ntfd.plugin.HttpEmitter('http://user:pass@localhost:8000/test')],
  test: {
    interval: 10,
  },
}

ntfd.run(suite, options)
