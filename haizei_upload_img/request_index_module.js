let template = require('art-template');
template.defaults.root = './views/';
let db = require('./db.js');
let url = require('url');
let querystring = require('querystring');
const formidable = require('formidable');
const fs = require('fs');

module.exports = {
    getall: function (req, res) {
        // 当执行req.session.session_data语句时，cookie-session第三方模块会自动获取本地session_id，
        // 然后去后台寻找有没有本session_id，如果有，会自动将后台的session_ata赋值给 req.session.session_data
        // 所以，这里只要 req.session.session_data 非空，就可以断定用户已经登录。
        if (!req.session.session_data) {
            res.render('./login.html');
            return;
        }
        db.select(function (data) {
            res.render('index.html', {
                data: data
            })
        })
    },
    getone: function (req, res) {
        if (!req.session.session_data) {
            res.render('./login.html');
            return;
        }
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).select(function (data) {
            res.render('roleInfo.html', {
                data: data
            })
        })
    },
    update_get: function (req, res) {
        if (!req.session.session_data) {
            res.render('./login.html');
            return;
        }
        let urlObj = url.parse(req.url, true);
        db.where("id=" + urlObj.query.id).select(function (data) {
            res.render('./update.html', {
                data: data
            })
        })
    },
    /* update_post: function (req, res) {
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
    }, */
    update_post: function (req, res) {
        const form = formidable({
            multiples: true,
            uploadDir: './static/upload_img'
        });
        form.parse(req, (err, fields, files) => {
            let random_filename = new Date().getTime() + files.img.name;
            fs.rename(files.img.path, './static/img/' + random_filename, err => {
                if (err) {
                    // console.log(err);
                    let str = "<script>window.onload = function () {mui.toast('图片上传失败', {duration: 1500});}</script>";
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    let urlObj = url.parse(req.url, true);
                    db.where("id=" + urlObj.query.id).select(function (data) {
                        let html = template("./update.html", { "data": data });
                        let result = html + str;
                        res.end(result);
                    })
                } else {
                    fields.img = './img/' + random_filename;
                    let urlObj = url.parse(req.url, true);
                    db.where("id=" + urlObj.query.id).update(fields, function (data) {
                        if (data >= 1) {
                            let str = "<script>window.onload = function () {mui.toast('修改成功', {duration: 1500});}</script>";
                            res.setHeader('Content-type', 'text/html;charset=utf-8');
                            db.select(function (data) {
                                let html = template('./index.html', { "data": data });
                                let result = html + str;
                                res.end(result);
                            })

                            // res.writeHead(301, {'Location': '/'});
                            // res.redirect('/', false);
                            // res.end(str);
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
                }
            })
        });
    },
    delete: function (req, res) {
        if (!req.session.session_data) {
            res.render('./login.html');
            return;
        }
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
        if (!req.session.session_data) {
            res.render('./login.html');
            return;
        }
        let html = template("./add.html", {});
        res.end(html);
    },
    add_post: function (req, res) {
        let post_data = '';
        req.on('data', function (data_sending) {
            post_data += data_sending;
        });
        req.on('end', function () {
            // let urlObj = url.parse(req.url, true);
            let data_obj = querystring.parse(post_data);
            if (data_obj.name == '') {
                let str = "<script>window.onload = function () {mui.toast('name属性为必填项', {duration: 1500});}</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                let html = template("./add.html", {});
                let result = html + str;
                res.end(result);
                return
            }
            // console.log(data_obj);
            // res.end();
            db.add(data_obj, function (data) {
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
    },
    login_get: function (req, res) {
        res.render('./login.html', {});
    },
    login_post: function (req, res) {
        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (fields.username == 'admin' && fields.password == '123') {
                req.session.session_data = fields;
                let str = "<script>window.onload = function () {mui.toast('登录成功', {duration: 1500});}</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                db.select(function (data) {
                    let html = template('./index.html', { "data": data });
                    let result = html + str;
                    res.end(result);
                })
            } else {
                let str = "<script>window.onload = function () {mui.toast('用户名或密码错误', {duration: 1500});}</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                let html = template('./login.html', {});
                let result = html + str;
                res.end(result);
            }
        });
    },
}
