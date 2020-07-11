let logic_module1=require('./logic_module1');
let logic_module2=require('./logic_module2');

function watch(server) {
    server.on('request', function (req, res) {
        let url = req.url;
        if (url == '/') {
            res.end(logic_module1.htmls);
        } else {
            logic_module2.index_file_list(url, res);
        }
    })
}
module.exports.watch=watch;