const path = require('path'),
      open = require('open'),
      express = require('express');

const http_port = 8000,
      websocket_port = 8081;

// http server
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.listen(http_port);
console.log('HTTP Server started at http://localhost:' + http_port);

open('http://localhost:' + http_port);
