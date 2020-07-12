let template = require('art-template');
template.defaults.root = './';

let mysql_module = require('./mysql.js');
mysql_module.getdata(data => {
    module.exports.index = template('./index.html', { "data": data });
});

module.exports.getone=function(id, callback){
    mysql_module.getone(id, function(data){
        callback(template('./roleInfo.html', {'data':data}));
    })
}
