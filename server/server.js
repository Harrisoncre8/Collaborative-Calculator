// requires
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

// uses
app.use( express.static('client') );

// servers
app.listen( PORT, () => {
  console.log('listening on port', PORT);
})