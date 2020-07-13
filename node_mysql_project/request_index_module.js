let template = require('art-template');
template.defaults.root = './';

let db = require('./db.js');
let url = require('url');
module.exports = {
    getall: function (req, res) {
        db.select(function (data) {
            let html = template('./index.html', { "data": data });
            res.end(html);
        })
    },
    getone: function (req, res) {
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).select(function (data) {
            let html = template("./roleInfo.html", { "data": data });
            res.end(html);
        })
    },
    update_get: function(req, res){
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).select(function (data) {
            let html = template("./update.html", { "data": data });
            res.end(html);
        })
    },
    update_post:function(req, res){
        let post_data='';
        req.on('data', function(data_sending){
            post_data+=data_sending;
        });
        req.on('end', function(){
            console.log(post_data);
            res.end();
        })
    }
}
