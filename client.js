var net = require('net');
var CONFIG = require('./config.json');

var argv = require('yargs')
              .usage('Usage: $0 -u [username|string]')
              .demand(['u'])
              .argv;

process.stdin.setEncoding('utf8');

var username = argv.u;

if (username === true) {
  return process.exit(9);
}

createConnection(process);

function createConnection(process) {
  var client = net.createConnection(CONFIG, function() {

    console.log('connection established as ' + username);

    client.write('!u ' + username);

    process.stdin.on('data', function(buffer) {
      client.write(buffer);
    });
  });

  client.on('data', function(data) {
    process.stdout.write(data);
  });

  client.on('end', function(data) {
    console.log('disconnected');
  });

  return true;
}
