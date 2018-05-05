
var express = require('express');
var app = express();
var http = require('http');
var async = require('async');
var port = process.env.PORT || 15668;

var server = http.createServer(app);
server.listen(port);