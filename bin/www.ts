let app = require('../app.js');
let http = require('http');

let port = 3000;
app.set('port', port);


var server = http.createServer(app);
server.listen(port);
