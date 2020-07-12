/* var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs_mysql_db'
});

connection.connect();

module.exports.getdata = function (callback) {
    let sqls = 'SELECT * FROM onepiece';
    connection.query(sqls, function (error, data, fields) {
        if (error) throw error;
        callback(data);
    });
}
module.exports.getone=function(id, callback){
    let sqls = 'SELECT * FROM onepiece WHERE id='+id;
    connection.query(sqls, function (error, data, fields) {
        console.log(data);
        callback(data);
    });
} */