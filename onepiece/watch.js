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
                request_index_module.getall(req, res);
            }else if(urlObj.pathname=='/getone'){
                request_index_module.getone(req, res);
            } else if(urlObj.pathname=='/update'){
                request_index_module.update_get(req, res);
            } else{
                request_static_module.static(urls, res);
            }
        }else if(method=='POST'){
            if(urlObj.pathname=='/update'){
                request_index_module.update_post(req, res);
            }
        }else{
            res.end('不支持该类型请求：'+method);
        }
    })
}