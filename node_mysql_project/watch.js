let request_index_module=require('./request_index_module.js');
let request_static_module=require('./request_static_module.js');

module.exports.watch=function(server){
    server.on('request', function(req, res){
        let url=req.url;
        if(url=='/'){
            res.end(request_index_module.index);
        }else{
            request_static_module.static(url, res);
        }
    })
}