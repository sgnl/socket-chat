var net = require('net');

process.stdin.setEncoding('utf8');

var client = net.createConnection({
  port: 5674
}, function() {
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