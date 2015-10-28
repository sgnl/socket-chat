var net = require('net');
var CONFIG = require('./config.json');
var commander = require('./lib/commander');
var yargs = require('yargs')
              .usage('Useage: $0 -l [logchat|bool]')
              .demand([])
              .argv;

process.stdin.setEncoding('utf8');

var pool = [];

var server = net.createServer(function(connection) {
  console.log('client connected.');

  // push into connection pool
  pool.push(connection);

  process.stdin.on('data', function(buffer) {
    connection.write('Admin: ' + buffer.toString());
  });

  connection.on('data', function(buffer) {
    process.stdout.write('' + connection.username + ': ' + buffer.toString());

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

server.listen(CONFIG.port, function() {
  console.log('server started.');
});

function broadcast (origin, data, pool) {
  pool.forEach(function(socket) {
    if (socket !== origin) {
      socket.write(origin.username + ': ' + data.toString());
    }
  });
}