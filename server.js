var net = require('net');

process.stdin.setEncoding('utf8');

var server = net.createServer(function(connection) {
  console.log('client connected.');

  connection.on('data', function(buffer) {
    console.log('inc');
  });
});

process.stdin.on('data', function() {

});

server.listen(5674, function() {
  console.log('server started.');
});