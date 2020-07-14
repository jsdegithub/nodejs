const express=require('express');
const app=express();

const router=require('./router.js');
app.use(router);

app.engine('html', require('express-art-template'));

app.use(express.static('static'));


app.listen(8000, function(){
    console.log("请访问127.0.0.1:8000");
})
