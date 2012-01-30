var ntf = require('ntf')
  , test = ntf.http('https://github.com')

exports.ntf = test.get('/silas/ntf', function(test, res) {
  test.statusCode(200)
  test.body('ntf')
  test.done()
})

exports.ntfd = test.get( '/silas/ntfd', function(test) {
  test.statusCode(200)
  test.body('ntfd')
  test.done()
})
