//관리자 사이트 관리자 계정 정보처리 라우팅
//http://localhost:3001/admin
var express = require("express");
var router = express.Router();
var db = require("../models/index");
var moment = require("moment");
var AES = require("mysql-aes");
var bcrypt = require("bcryptjs");

//--------------------------------------------------진행 메모
//양방향 암호화 데이터 복호화 과정 미구현

//localhost:3001/admin/list
router.get("/list", async (req, res) => {
  var admin_member = await db.Admin.findAll({
    attributes: [
      "admin_member_id",
      "company_code",
      "admin_id",
      "admin_name",
      "email",
      "telephone",
      "dept_name",
      "used_yn_code",
      "reg_user_id",
      "reg_date",
      "edit_user_id",
      "edit_date",
    ],
  });

  res.render("admin/list", { admin_member, moment });
});

//검색결과 필터링용 post 라우터 메소드
//구현중
router.post("/list", async (req, res) => {
  var searchName = req.body.name;
  var searchCompany = req.body.company_code;
  var searchState = req.body.state_code;
});

//localhost:3001/admin/create
router.get("/create", async (req, res) => {
  res.render("admin/create");
});

//localhost:3001/admin/create
router.post("/create", async (req, res) => {
  //password는 bcrypt 암호화 진행
  var password = req.body.admin_password;
  var encryptedPW = await bcrypt.hash(password, 12);

  var admin = {
    company_code: req.body.company_code,
    admin_id: req.body.admin_id,
    admin_password: encryptedPW,
    admin_name: req.body.admin_name,
    email: req.body.email,
    telephone: req.body.telephone,
    dept_name: req.body.dept_name,
    used_yn_code: req.body.used_yn_code,
    reg_user_id: 1,
    reg_date: Date.now(),
  };

  await db.Admin.create(admin);

  res.redirect("/admin/list");
});

//localhost:3001/admin/delete?admin_id=1
router.get("/delete", async (req, res, next) => {
  var adminIdx = req.query.admin_id;
  await db.Admin.destroy({ where: { admin_member_id: adminIdx } });
  res.redirect("/admin/list");
});

//localhost:3001/admin/modify/
router.get("/modify/:admin_id", async (req, res, next) => {
  var adminIdx = req.params.admin_id;

  var admin = await db.Admin.findOne({ where: { admin_member_id: adminIdx } });
  admin.admin_password = "";

  res.render("admin/modify", { admin });
});

router.post("/modify/:admin_id", async (req, res, next) => {
  var adminIdx = req.params.admin_id;

  var admin_password = req.body.admin_password;

  var admin = {
    company_code: req.body.company_code,
    admin_id: req.body.admin_id,
    admin_password,
    admin_name: req.body.admin_name,
    email: req.body.email,
    telephone: req.body.telephone,
    dept_name: req.body.dept_name,
    used_yn_code: req.body.used_yn_code,
    edit_user_id: 1,
    edit_date: Date.now(),
  };

  await db.Admin.update(admin, { where: { admin_member_id: adminIdx } });

  res.redirect("/admin/list");
});

module.exports = router;
