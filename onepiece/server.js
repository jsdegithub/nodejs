let http=require('http');
let server=http.createServer();

server.listen(3600, function(){
    console.log('请访问127.0.0.1:3600');
})

let watch_module=require('./watch.js');
watch_module.watch(server);