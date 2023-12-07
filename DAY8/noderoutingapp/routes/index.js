var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//콜백함수를 router.get()메소드의 파라미터로 호출주소와 콜백함수를 전달해서
//router.get()메소드가 요청과 응답을 처리하게 됨
//기본 콜백함수를 전달하여 진행
router.get('/main',(req,res)=>{
  res.render('index.ejs', {title: '메인페이지'});
});

//async, await 방식을 통한 router.get()메소드 실행
//비동기 프로그래밍의 절차중심 기능 개발 시 promise 또는 async/await 방식을 사용하면
//비동기 프로그래밍 환경에서 순차적 프로그래밍 가능
router.get('/index',async(req,res)=>{
  res.render('index.ejs', {title: '인덱스 페이지'});
});

//localhost:3000/products
//응답결과: 상품목록 JSON데이터 목록
router.get('/products',async(req,res)=>{

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
})



module.exports = router;
