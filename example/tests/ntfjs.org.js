var ntf = require('ntf')
  , test = ntf.http('http://ntfjs.org')

exports.ntf = test.get('/', function(test) {
  test.statusCode(200)
  test.body('ntf')
  test.done()
})
