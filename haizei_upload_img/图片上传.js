const express = require('express');
const app = express();
const formidable = require('formidable');
const fs=require('fs');

app.post('/', (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: './upload_img'
    });
    form.parse(req, (err, fields, files) => {
        fs.rename(files.test_img.path, './upload_img_rename/'+files.test_img.name, err => {
            console.log(err);
        })
        res.end();
    });
})


app.listen(8000, function () {
    console.log("请访问127.0.0.1:8000");
})
