var regexKey = /(!\w+) (.*)/;

function command () {
  return {
    inspect: inspect,
    parse: parse
  };
}

function inspect (buffer, cb) {
  var message = buffer.toString().trim();

  var result = regexKey.exec(message);
  // TODO add error handling

  if (!result) {
    // no command found send back message
    return cb(null, {
      command: null,
      message: message
    });
  }

  return cb(null, {
    // [ '!u Tom', '!u', 'Tom', index: 0, input: '!u Tom' ]
    original: result.input,
    command: result[1],
    param: result[2]
  });
}

function parse (connection, input) {
  switch (input.command) {
    case '!u':
      connection.username = input.param;
      console.log(connection.username + ' has set their username.');
      console.log(connection);
  }
}

module.exports = command();