var http = require('http');
var fs = require('fs');
var server = http.createServer(function (request, response) {
    fs.readFile('editor.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html', 'Content-length': data.length });
        response.write(data);
        response.end();
    });
});

server.listen(process.env.PORT || 8080);