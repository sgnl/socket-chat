var net = require('net');

process.stdin.setEncoding('utf8');

var pool = [];

var server = net.createServer(function(connection) {
  console.log('client connected.');

  pool.push(connection);
  // console.log(connection);

  connection.on('data', function(buffer) {
    pool.forEach(function(socket) {
      if (socket !== connection) {
        socket.write(buffer);
      }
    });
  });
});

process.stdin.on('data', function() {

});

server.listen(5674, function() {
  console.log('server started.');
});