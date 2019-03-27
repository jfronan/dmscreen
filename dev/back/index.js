const locationTrees = require('./services/locationsTrees');
const config = require('./config/config');
const opn = require('opn');

var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(__dirname + '/../front'));
app.use(express.static(__dirname + '/../'));
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/../front/index.html'));
});
app.get('/mapTree', locationTrees.createTree);
app.get('/cerrarApp', process.exit);

app.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
    opn(`http://${config.hostname}:${config.port}/`, {app: ['google chrome']}, function (err) {
      if (err) throw err;
      console.log('The user closed the browser');
      opn(`http://${config.hostname}:${config.port}/`);
    });
});
