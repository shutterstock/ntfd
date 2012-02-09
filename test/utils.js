var utils = require('../lib/ntfd/utils')

var loadPath = __dirname + '/assets/load'

exports.load = function(test) {
  var data = utils.load(loadPath)

  test.ok(data.hasOwnProperty('sometest'))
  test.equal(data.sometest, loadPath + '/sometest.js')

  test.done()
}
