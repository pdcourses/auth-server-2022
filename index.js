const http = require('http');
const {app} = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1';

server.listen(port, host, () => console.log('Server is listening...') );