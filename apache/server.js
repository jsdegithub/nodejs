let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', function (req, res) {
    let url=req.url;
    console.log(url);
    
    if(url=='/'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.readFile('./index.html', 'utf8', function(err, data){
            res.end(data);
        })
    }else if(url=='/itemlist'){
        fs.readdir('./', function(err, files){
            res.end(JSON.stringify(files));
        })
    }else{
        url='.'+url;
        fs.readFile(url, function(err, data){   //这里不能加上参数'utf8'，加上就会读取不到图片。
            res.end(data);
        })
    }
})


server.listen(3600, function () {
    console.log('请访问127.0.0.1:3600');
})

