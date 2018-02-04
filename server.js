const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stocktrack');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log('Express server running on port', port);

});
