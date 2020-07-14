let express = require('express');
let router = express.Router();
let request_index_module = require('./request_index_module.js');

router
    .get('/', request_index_module.getall)
    .get('/getone', request_index_module.getone)
    .get('/update', request_index_module.update_get)
    .get('/delete', request_index_module.delete)
    .get('/add', request_index_module.add_get)

router
    .post('/update', request_index_module.update_post)
    .post('/add', request_index_module.add_post)


module.exports = router;