//productAPI.js의 기본호출주소 http://localhost:3000/api/product/

var express = require('express');
var router = express.Router();


//localhost:3000/api/product/list
router.get('/api/product/list',async(req,res)=>{

    var products=[
        {
          //json Data
            pid:1,
            pname:"노트북",
            price:5000,
            stock:4
        },
        {
            pid:2,
            pname:"삼성 노트북",
            price:6000,
            stock:2
        }
    ];
    
      //res.json('json데이터=배열 혹은 단일객체')메소드는 지정한 json데이터를 브라우저로 전송
    res.json(products);
});


module.exports = router;