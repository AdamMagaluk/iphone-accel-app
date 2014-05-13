var static = require('node-static');

var file = new static.Server('./public');

require('http').createServer(function (request, response) {
  var clientIp = request.headers['X-Forwarded-For'] || request.connection.remoteAddress;
  request.addListener('end', function () {
    response.setHeader('Set-Cookie','deviceName=phone-'+clientIp);
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 8080);
