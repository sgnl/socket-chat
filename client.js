var net = require('net');

var client = net.createConnection({
  port: 5674
}, function() {
  console.log('connection established');

  process.stdin.on('data', function(buffer) {
    client.write(buffer);
  });

});

client.on('data', function(data) {

});

client.on('end', function(data) {
  console.log('disconnected');
});