let request_index_module=require('./request_index_module.js');
let request_static_module=require('./request_static_module.js');
let url=require('url');

module.exports.watch=function(server){
    server.on('request', function(req, res){
        let urls=req.url;
        let urlObj=url.parse(urls, true);
        let method=req.method;
        if(method=='GET'){
            if(urlObj.pathname=='/'){
                res.end(request_index_module.index);
            }else if(urlObj.pathname=='/getone'){
                request_index_module.getone(urlObj.query.id, function(data){
                    res.end(data);
                });
            } else{
                request_static_module.static(urls, res);
            }
        }else if(method=='POST'){
            res.end('post');
        }else{
            res.end('不支持该类型请求：'+method);
        }
    })
}