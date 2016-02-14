'use strict';

// based on https://raw.githubusercontent.com/amark/gun/master/examples/http.js

var PORT = 9966;
var PID_FILE = 'SERVER.PID';

var fs = require('fs');
var http = require('http');
var path = require('path');
//var process = require('http');
var Gun = require('gun');

console.log('Our process id is %s', process.pid);
fs.writeFileSync(PID_FILE, '' + process.pid);

var gun = Gun({
    file: 'data.json'
});

var server = http.createServer(function(req, res){
    if (gun.wsp.server(req, res)) {
        return; // filters gun requests!
    }
    fs.createReadStream(path.join(__dirname, req.url))
    .on('error', function() { // static files!
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync(path.join(__dirname, 'index.html'))); // or default to index
    }).pipe(res); // stream
});
gun.wsp(server);
server.listen(PORT);

console.log('GunDB server started on port ' + PORT + ' with /gun');

process.on('SIGINT', function() {
    console.log('Leaving...');
    fs.unlinkSync(PID_FILE);
    process.exit();
});
