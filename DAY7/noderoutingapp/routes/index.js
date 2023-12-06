//express 웹개발 프레임워크 패키지 참조
var express = require('express');
var router = express.Router();

//신규메인페이지
//localhost:3000/main
router.get('/main', function(req,res){
  res.render('main');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/company', function(req,res){

  //res는 HttpResponse 객체로 웹서버에서 웹브라우저(클라이언트)로 응답을 처리해주는 객체입니다.
  //웹서버에서 웹브라우저 또는 클라이언트로 특정정보를 전달하고 싶을때는 res 객체를 사용한다.
  //주로 res를 이용해 서버상의 웹페이지(뷰), 데이터(json 데이터)등을 전달합니다.
  //res.render('views폴더내의 특정뷰파일 지정', 뷰에 전달할 데이터)메소드는 view폴더내에 있는 
  //지정한 views폴더내에 있는 지정한 
  res.render('company.ejs',{companyName:"네이버", ceo:"강창훈"});
});

//회사 연락처 정보 제공 웹페이지 요청과 응답 처리 라우팅 메소드
//http://localhost:3000/contact
//사용자 요청은 동일주소체계와 동일 요청방식(get/post)과 일치하는 라우팅 메소드를 찾아서 해당 메소드의
//콜백함수가 실행되어 응답이 전송됩니다.
//요청방식은 대략 6개가 있는데 get방식은 사용자가 링크를 클릭했을 때 사용
router.get('/contact', function(req,res){
  //views 폴더 아래 sample 폴더 아래 contact.ejs 파일(확장자 생략)
  res.render('sample/contact', 
  {email:"am3ca723@gmail.com", 
  telephone:"010-1111-2222",
  address: "테헤란로 415 선릉역 9,10번 출구"});
});

//회사 제품소개 웹페이지 요청과 응담 처리 라우팅 메소드
//회사 주소체계: http://localhost:3000/products/computer
router.get("/products/computer", function (req, res) {
  //단일 컴퓨터 정보 json 데이터
  const computer = {
    brand: "LG전자",
    productName: "LG그램 17",
    price: "1700000",
    img: "https://www.lge.co.kr/kr/images/notebook/md08917842/gallery/medium01.jpg",
  };
  //파일명과 지정 주소가 달라도 oK
  res.render("product/computers.ejs", { computer });
});

//회사 대표 인삿말 웹페이지 요청과 응답 처리 라우팅 메소드
//호출 주소: http://localhost:3000/welcome
//호출방식: get호출 > router.get() 메소드 응답
//반환형식: 웹페이지, 웹페이지+데이터, only Data(RESTFul서비스)
router.get("/welcome", function(req, res){
  res.render('welcome.ejs');
});


//반드시 라우터 파일에서는 해당 라우터 객체를 외부로 export 
module.exports = router;
