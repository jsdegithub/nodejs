let fs = require('fs');
let moment = require('moment');
let template = require('art-template');
template.defaults.root = './';

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
                exports.htmls = htmls;
            }
        });
    }
})
