//create web server
var http = require('http');
//create file system
var fs = require('fs');
//create web server
var server = http.createServer(function(req, res) {
    console.log('Request was made: ' + req.url);
    //check the request url
    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/contact') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    } else if (req.url === '/api/ninjas') {
        var ninjas = [{
                name: 'ryu',
                age: 29
            },
            {
                name: 'yoshi',
                age: 32
            }
        ];
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(ninjas));
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});
//listen to port
server.listen(3000);
console.log('Server is listening to port 3000');
//check the request url
//if the request url is /home, then the server will send the index.html file to the client
//if the request url is /contact, then the server will send the contact.html file to the client
//if the request url is /api/ninjas, then the server will send the JSON object to the client
//if the request url is not /home, /contact, or /api/ninjas, then the server will send the 404.html file to the client
