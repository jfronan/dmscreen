const locationTrees = require('./services/locationsTrees');
const personajesList = require('./services/personajesList');
const reducerManager = require('./services/reducerManager');
const config = require('./config/config');
const opn = require('opn');
const bodyParser = require('body-parser')

var express = require('express');
var app = express();
var path = require("path");

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../front'));
app.use(express.static(__dirname + '/../'));
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/../front/index.html'));
});
app.get('/mapTree', locationTrees.createTree);
app.get('/personajesList', personajesList.createList);
app.post('/cerrarApp', reducerManager.store);
app.get('/logsRetriever', reducerManager.retrieve);

app.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
    opn(`http://${config.hostname}:${config.port}/`, {app: ['google chrome']}, function (err) {
      if (err) throw err;
      console.log('The user closed the browser');
      opn(`http://${config.hostname}:${config.port}/`);
    });
});
