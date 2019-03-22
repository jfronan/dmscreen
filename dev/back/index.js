const locationTrees = require('./services/locationsTrees');
const config = require('./config/config');

var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(__dirname + '/../front'));
app.use(express.static(__dirname + '/../'));
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/../front/index.html'));
});
app.get('/mapTree', locationTrees.createTree);

app.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
