let fs=require('fs');
fs.readdir('./', 'utf8', function(err, data){
    console.log(data);
})