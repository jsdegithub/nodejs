const express=require('express');
const app=express();


const cookie_session=require('cookie-session');  //该模块（5~9行）要设置在以下router（12~13行）模块之前
app.use(cookie_session({
    name: 'session',
    keys: ['key1']
}))


const router=require('./router.js');
app.use(router);


app.engine('html', require('express-art-template'));

app.use(express.static('static'));


app.listen(8000, function(){
    console.log("请访问127.0.0.1:8000");
})
