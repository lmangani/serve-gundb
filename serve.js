'use strict';

// https://raw.githubusercontent.com/amark/gun/master/examples/http.js

var path = require('path');
var http = require('http');
var fs = require('fs');

var port = 9966;

var Gun = require('gun');
var gun = Gun({ 
	file: 'data.json'
});

var server = http.createServer(function(req, res){
	if (gun.wsp.server(req, res)){ 
		return; // filters gun requests!
	}
	fs.createReadStream(path.join(__dirname, req.url)).on('error',function(){ // static files!
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(fs.readFileSync(path.join(__dirname, 'index.html'))); // or default to index
	}).pipe(res); // stream
});
gun.wsp(server);
server.listen(port);

console.log('Server started on port ' + port + ' with /gun');
