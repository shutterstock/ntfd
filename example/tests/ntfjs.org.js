var ntf = require('ntf')
  , test = ntf.http('http://ntfjs.org')

exports.frontpage = test.get('/', function(test) {
  test.statusCode(200)
  test.body('ntf')
  test.done()
})

exports.fail = test.get('/fail', function(test) {
  test.statusCode(200)
  test.done()
})
