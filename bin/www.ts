let app = require('../app.js');
let http = require('http');

app.set('port', process.env.PORT);

var server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', () => console.log(`listing on http://localhost:${process.env.PORT}`));
server.on('error', () => console.log('server error'));
