var express = require('express');
var app = express();
const http = require('http');
const fs = require('fs');
var path = require("path");

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(__dirname + '/../front'));
app.use(express.static(__dirname + '/../'));
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/../front/index.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/*
fs.readFile('../front/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
*/
