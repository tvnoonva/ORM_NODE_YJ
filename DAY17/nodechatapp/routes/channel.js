var express = require('express');
var router = express.Router();

//localhost:3001
router.get('/', async(req,res)=>{
    res.render('chat/index');
});

module.exports = router;