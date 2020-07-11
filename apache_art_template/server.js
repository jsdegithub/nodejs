let http = require('http');
let fs = require('fs');
let server = http.createServer();
let moment = require('moment');
let template = require('art-template');
template.defaults.root = './';

// 定义art-template模板过滤器
/* template.defaults.imports.typeFilter=function(name){
    if (/.html$/.test(name)) {
        return 'html';
    } else if (/.js$/.test(name)) {
        return 'js';
    } else {
        return 'folder';
    }
} */

server.on('request', function (req, res) {
    let url = req.url;
    if (url == '/') {
        fs.readdir('./', function (err, files) {
            let arr = [];
            for (let i = 0; i < files.length; i++) {
                fs.stat(files[i], function (err, data) {
                    let obj = {};
                    obj.name = files[i];
                    obj.mtime = moment(data.mtime).format('YYYY-MM-DD hh:mm:ss');
                    obj.size = data.size;
                    arr.push(obj);
                    if (i === files.length - 1) {
                        let htmls = template('./index.html', { data: arr });
                        res.end(htmls);
                    }
                });
            }
        })
    } else {
        url = '.' + url;
        fs.readFile(url, function (err, data) {   //这里不能加上参数'utf8'，加上就会读取不到图片。
            res.end(data);
        })
    }
})

server.listen(3600, function () {
    console.log('请访问127.0.0.1:3600');
})

