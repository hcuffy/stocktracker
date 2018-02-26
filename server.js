const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stocktrack');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const port = process.env.PORT || 3000;



io.on('connection', function (socket) {
  console.log('connected');
  socket.on('added stock', function () {
    io.emit('update');
  });
});

server.listen(port, () => {
  console.log('Server running on port', port);
});
