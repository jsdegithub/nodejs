let fs = require('fs');

let static=function(url, res) {
    url = '.' + url;
    fs.readFile(url, function (err, data) {   //这里不能加上参数'utf8'，加上就会读取不到图片。
        res.end(data);
    })
}

exports.static=static;