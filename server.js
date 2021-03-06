const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Stock = require('./models/stock');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stocktrack');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

io.on('connection', function(socket) {
	console.log('Connected');

	socket.on('added', function() {
		Stock.find({}, function(err, docs) {
			if (err) throw err;
			io.emit('update', {
				data: docs
			});
		});
	});

	socket.on('remove', function() {
		Stock.find({}, function(err, docs) {
			if (err) throw err;
			io.emit('update', {
				data: docs
			});
		});
	});

	socket.on('disconnect', function(data) {
		console.log('Someone Disconnected');
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log('Server running on port', port);
});
