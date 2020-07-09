let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', function (req, res) {
    let url = req.url;
    console.log(url);
    if (url == '/') {
        res.setHeader('Content-type', 'text/html; charset=utf-8');
        fs.readFile('./hello.html', 'utf8', function (err, data) {
            res.end(data);
        })
    } else {
        fs.readFile('.' + url, function (err, data) {
            res.end(data);
        })
    }
})


server.listen(3600, function () {
    console.log('请访问127.0.0.1:3600');
})

