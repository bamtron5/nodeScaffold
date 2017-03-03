var app = require('../app.js');
var http = require('http');
app.set('port', process.env.PORT);
var server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', function () { return console.log("listing on http://localhost:" + process.env.PORT); });
server.on('error', function () { return console.log('server error'); });
