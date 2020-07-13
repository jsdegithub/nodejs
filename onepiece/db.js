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
        if(this.wh===undefined){
            sqls="select * from onepiece";
        }else{
            sqls="select * from onepiece where "+this.wh;  //where 后面有一个空格不能丢
            // console.log(sqls);
        }
        connection.query(sqls, function (error, data, fields) {
            callback(data);
        });
        this.wh=undefined;
    },
    update:function(data, callback){
        if(this.wh===undefined){
            console.log("ERROR: 查询语句未指定操作对象(where)!");
            return;
        }
        let set='';
        for(i in data){
            set+=i+"='"+data[i]+"',";
        }
        set=set.slice(0, set.length-1);
        let sql="update onepiece set "+set+" where "+this.wh;
        // console.log(sql);
        connection.query(sql, function(err, data){
            callback(data.changedRows);
        })
        this.wh=undefined;
    }
}