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
    }
}
