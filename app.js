"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var index_1 = require("./routes/index");
var app = express();
if (app.get('env') === 'development') {
    var dotenv = require('dotenv');
    dotenv.load();
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/', index_1.default);
module.exports = app;
