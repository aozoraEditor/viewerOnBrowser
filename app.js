var http = require('http');
var fs = require('fs');
console.log("starting...");
var server = http.createServer(function (request, response) {
    var mimetype = "";
    var url = request.url.slice(1);
    console.log(url);
    if (request.url === "/") { url = "index.html"; mimetype = "text/html"; request.url = "/index.html"; }
    var dotoffset = request.url.lastIndexOf('.');
    console.log(dotoffset, request.rawHeaders);
    if (dotoffset !== ".map") {
        mimetype = dotoffset == -1
            ? 'text/plain'
            : {
                '.html': 'text/html',
                '.ico': 'image/x-icon',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.css': 'text/css',
                '.js': 'text/javascript'
            }[request.url.substr(dotoffset)];
    }
    else {
        dotoffset = request.url.lastIndexOf('.', dotoffset - 1);
        mimetype = dotoffset == -1
            ? 'text/plain' : {
                '.css.map': 'text/css',
                '.js.map': 'text/javascript'
            }[request.url.substr(dotoffset)];
    }
    console.log(mimetype);
    response.writeHead(200, { "Content-Type": mimetype });

    fs.readFile(url, {}, function (err, data) {
        if (err) {
            response.end();
        }
        else {
            if (data !== null) { response.write(data); }
            else response.statusCode = 404;
            response.end();
        }
    });
});

server.listen(process.env.PORT || 80, () => {
    console.log("Server running");
});