let template = require('art-template');
template.defaults.root = './';
let db = require('./db.js');
let url = require('url');
let querystring = require('querystring');

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
    update_get: function (req, res) {
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).select(function (data) {
            let html = template("./update.html", { "data": data });
            res.end(html);
        })
    },
    update_post: function (req, res) {
        let post_data = '';
        req.on('data', function (data_sending) {
            post_data += data_sending;
        });
        req.on('end', function () {
            let urlObj = url.parse(req.url, true);
            let data_obj = querystring.parse(post_data);
            // console.log(data_obj);
            db.where("id=" + urlObj.query.id).update(data_obj, function (data) {
                // res.end(data.toString());
                if (data >= 1) {
                    let str = "<script>window.onload = function () {mui.toast('修改成功', {duration: 1500});}</script>";
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    db.select(function (data) {
                        let html = template('./index.html', { "data": data });
                        let result = html + str;
                        res.end(result);
                    })
                } else {
                    let str = "<script>window.onload = function () {mui.toast('未作任何修改', {duration: 1500});}</script>";
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    let urlObj = url.parse(req.url, true);
                    db.where("id=" + urlObj.query.id).select(function (data) {
                        let html = template("./update.html", { "data": data });
                        let result = html + str;
                        res.end(result);
                    })
                }
            });
        })
    },
    delete: function (req, res) {
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).delete(function (data) {
            if (data === 1) {
                let str = "<script>window.onload = function () {mui.toast('删除成功', {duration: 1500});}</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                db.select(function (data) {
                    let html = template('./index.html', { "data": data });
                    let result = html + str;
                    res.end(result);
                })
            } else {
                let str = "<script>window.onload = function () {mui.toast('删除失败', {duration: 1500});}</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                db.select(function (data) {
                    let html = template('./index.html', { "data": data });
                    let result = html + str;
                    res.end(result);
                })
            }
        })
    },
    add_get: function (req, res) {
        let html = template("./add.html", {});
        res.end(html);
    },
    add_post:function(req, res){
        let post_data = '';
        req.on('data', function (data_sending) {
            post_data += data_sending;
        });
        req.on('end', function () {
            // let urlObj = url.parse(req.url, true);
            let data_obj = querystring.parse(post_data);
            // console.log(data_obj);
            // res.end();
            db.add(data_obj, function(data){
                if (data === 1) {
                    let str = "<script>window.onload = function () {mui.toast('添加成功', {duration: 1500});}</script>";
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    db.select(function (data) {
                        let html = template('./index.html', { "data": data });
                        let result = html + str;
                        res.end(result);
                    })
                } else {
                    let str = "<script>window.onload = function () {mui.toast('添加失败', {duration: 1500});}</script>";
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    db.select(function (data) {
                        let html = template('./index.html', { "data": data });
                        let result = html + str;
                        res.end(result);
                    })
                }
            })
        })
    }
}
