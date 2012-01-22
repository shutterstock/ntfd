var ntf = require('ntf')
  , ntfd = require('ntfd')

var suite = ntf.utils.load(__dirname + '/tests')

var options = {
  test: {
    interval: 10,
  },
}

ntfd.run(suite, options)
