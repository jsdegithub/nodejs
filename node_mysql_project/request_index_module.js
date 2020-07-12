let template = require('art-template');
template.defaults.root = './';

let mysql_module = require('./mysql.js');
mysql_module.getdata(data => {
    module.exports.index = template('./index.html', { "data": data });
});
