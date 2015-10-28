var net = require('net');

var client = net.createConnection({
  port: 5674
}, function() {
  console.log('connection established');


});

client.on('data', function(data) {

});

client.on('end', function(data) {
  console.log('disconnected');
});