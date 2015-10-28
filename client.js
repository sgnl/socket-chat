var net = require('net');
var CONFIG = require('./config.json');

process.stdin.setEncoding('utf8');

var client = net.createConnection(CONFIG, function() {
  console.log('connection established');

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