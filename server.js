var net = require('net');
var commander = require('./lib/commander');
var CONFIG = require('./config.json');

process.stdin.setEncoding('utf8');

var pool = [];

var server = net.createServer(function(connection) {
  console.log('client connected.');

  pool.push(connection);

  connection.on('data', function(buffer) {

    // check for 'commands'
    commander.inspect(buffer, function(err, parsed){
      /**
       * err not implemented
       */

      if (!parsed.command) {
        // refactor
        broadcast(connection, buffer, pool);
      } else {
        commander.parse(connection, parsed);
      }
    });
  });
});

process.stdin.on('data', function() {

});

server.listen(CONFIG.port, function() {
  console.log('server started.');
});

function broadcast (origin, data, pool) {
  pool.forEach(function(socket) {
    if (socket !== origin) {
      console.log(socket.username);
      socket.write(origin.username + ': ' + data.toString());
    }
  });
}