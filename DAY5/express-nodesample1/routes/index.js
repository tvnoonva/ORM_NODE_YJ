var express = require('express');
var router = express.Router();

/* 메인 홈페이지 요청 및 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

module.exports = router;
