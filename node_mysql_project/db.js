var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs_mysql_db'
});

connection.connect();

module.exports={
    wh:undefined,
    where:function(wh){
        this.wh=wh;
        return this;
    },
    select:function(callback){
        let sqls='';
        if(this.wh==undefined){
            sqls="select * from onepiece";
        }else{
            sqls="select * from onepiece where "+this.wh;
            console.log(sqls);
        }
        connection.query(sqls, function (error, data, fields) {
            callback(data);
        });
        this.wh=undefined;
    }
}