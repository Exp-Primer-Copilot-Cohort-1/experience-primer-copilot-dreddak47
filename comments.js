//Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = require('./comments');

//create server
http.createServer((req, res) => {
    //parse request
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    //get method
    const method = req.method;

    if (pathName === '/api/comments' && method === 'GET') {
        //get comments
        comments.get((err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err.message);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    } else if (pathName === '/api/comments' && method === 'POST') {
        //add comments
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const comment = JSON.parse(body);
            comments.add(comment, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(err.message);
                    return;
                }
                res.end('OK');
            });
        });
    } else {
        //serve static files
        let filePath = path.join(__dirname, 'public', pathName);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
                return;
            }
            res.end(data);
        });
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
