const http = require('http'), net = require('net'), url = require('url')
const proxy = http.createServer()
proxy.listen(8888, () => {
  console.log('Your application is running here: http://0.0.0.0:8888')
})
proxy.on('request', function (req, res) {
  let url = req.url, result = ''
  if (url !== '/favicon.ico') {
    let type = req.method, data = ''
    console.log(req)
  }
  res.end(JSON.stringify(result))
})