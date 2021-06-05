const http = require('http');
const app = require('./app');
const config = require('./config.json');
const server = http.createServer(app);

server.listen(config.serverPort , console.log(`Server started on port ${config.serverPort}`));


