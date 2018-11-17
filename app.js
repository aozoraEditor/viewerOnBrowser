var http = require('http');
var fs = require('fs');
console.log("starting...");
var server = http.createServer(function (request, response) {
    var url = request.url.slice(1);
    if (url == "index.html" || url == "") { url = "editor.html"; }
    console.log(url);
    var dotoffset = request.url.lastIndexOf('.');
    var mimetype = dotoffset == -1
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