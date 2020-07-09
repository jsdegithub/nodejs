let fs=require('fs');
let str='jinshuo';
fs.readFile('./hello.txt', 'utf8', function(err, data){
    console.log(str+data);
})
fs.writeFile('./write.txt', str, function(err){
    if(!err){
        console.log('写入成功');
    }else{
        throw err;
    }
})