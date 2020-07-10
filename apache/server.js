let http = require('http');
let fs = require('fs');
let server = http.createServer();

server.on('request', function (req, res) {
    let url=req.url;
    console.log(url);
    
    if(url=='/'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.readFile('./index.html', 'utf8', function(err, data){
            res.end(data);
        })
    }else if(url=='/itemlist'){
        /* fs.readdir('./', function(err, files){
            let arr=[];
            let count=0;
            for(let i=0; i<files.length; i++){
                let obj={};
                fs.stat(files[i], function(err, data){
                    // console.log(data);
                    count++;
                    let mtime=data['mtime'];
                    // console.log(mtime);
                    let size=data['size'];
                    // console.log(size);
                    obj.mtime=mtime;
                    obj.size=size;
                    arr.push(obj);
                    if(count===files.length){
                        console.log(arr);
                        res.end(JSON.stringify(arr));
                    }
                    // console.log(obj);
                });
                // console.log(obj);
                obj.name=files[i];
                // console.log(obj);
                
            }
            // console.log(arr);
            
        }) */

        fs.readdir('./', function(err, files){
            let arr=[];
            for(let i=0; i<files.length; i++){
                (function(i){
                    fs.stat(files[i], function(err, data){
                        let obj={};
                        obj.name=files[i];
                        obj.mtime=data.mtime;
                        obj.size=data.size;
                        arr.push(obj);
                        if(i===files.length-1){
                            res.end(JSON.stringify(arr));
                        }
                    });
                })(i);
            }
        })
    }else{
        url='.'+url;
        fs.readFile(url, function(err, data){   //这里不能加上参数'utf8'，加上就会读取不到图片。
            res.end(data);
        })
    }
})


server.listen(3600, function () {
    console.log('请访问127.0.0.1:3600');
})

