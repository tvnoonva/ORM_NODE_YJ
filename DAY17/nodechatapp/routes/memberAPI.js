var express = require("express");
var router = express.Router();

/* GET home page. */
var member_list = [
    {
        member_id: 1,
        email: "am3ca723@gmail.com",
        member_password: "pass1234",
        name: "최유진",
        profile_img_path: "",
        telephone: "101-111-1111",
        entry_type_code: 1,
        use_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    },
    {
        member_id: 2,
        email: "am3ca7231@gmail.com",
        member_password: "pass1234111",
        name: "최유빈",
        profile_img_path: "",
        telephone: "101-111-2222",
        entry_type_code: 1,
        use_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    },
    {
        member_id: 3,
        email: "am3ca7232@gmail.com",
        member_password: "pass123431",
        name: "최유신",
        profile_img_path: "",
        telephone: "101-111-1234",
        entry_type_code: 1,
        use_state_code: 0,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    }
];
var apiResult = {
    code: 200,
    data: [],
    result: "OK"
}

router.get("/all", async (req, res, next) => {
    try {

        apiResult.code = 200;
        apiResult.data = member_list;
        apiResult.result = "OK";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);

});

router.post("/create", async (req, res, next) => {

    try {
        var member_id = req.body.member_id;
        var email = req.body.email;
        var member_password = req.body.member_password;
        var name = req.body.name;
        var profile_img_path = req.body.profile_img_path;
        var telephone = req.body.telephone;
        var entry_type_code = req.body.entry_type_code;
        var use_state_code = req.body.use_state_code;
        var reg_date = req.body.reg_date;
        var reg_member_id = req.body.reg_member_id;
        var edit_date = req.body.edit_date;
        var edit_member_id = req.body.edit_member_id;

        var savedMember = {
            member_id,
            email,
            member_password,
            name,
            profile_img_path,
            telephone,
            entry_type_code,
            use_state_code,
            reg_date: Date.now(),
            reg_member_id,
            edit_date: Date.now(),
            edit_member_id,
        };

        //
        var member = {
            member_id: 1,
            email: "am3ca723@gmail.com",
            member_password: "pass1234",
            name: "최유진",
            profile_img_path: "",
            telephone: "101-111-1111",
            entry_type_code: 1,
            use_state_code: 1,
            reg_date: Date.now(),
            reg_member_id: "yujin",
            edit_date: Date.now(),
            edit_member_id: "yujin"
        };

        apiResult.code = 200;
        apiResult.data = member;
        apiResult.result = "OK";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);

});

router.post("/modify", async (req, res, next) => {
    try {
        var member_id = req.body.member_id;
        var email = req.body.email;
        var member_password = req.body.member_password;
        var name = req.body.name;
        var profile_img_path = req.body.profile_img_path;
        var telephone = req.body.telephone;
        var entry_type_code = req.body.entry_type_code;
        var use_state_code = req.body.use_state_code;
        var reg_date = req.body.reg_date;
        var reg_member_id = req.body.reg_member_id;
        var edit_date = req.body.edit_date;
        var edit_member_id = req.body.edit_member_id;

        var savedMember = {
            member_id,
            email,
            member_password,
            name,
            profile_img_path,
            telephone,
            entry_type_code,
            use_state_code,
            reg_date: Date.now(),
            reg_member_id,
            edit_date: Date.now(),
            edit_member_id,
        };

        //
        var affectedCnt = 1;

        apiResult.code = 200;
        apiResult.data = affectedCnt;
        apiResult.result = "OK";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);
});

router.post("/delete", async (req, res, next) => {
    try {
        var member_id = req.body.member_id;
        //삭제

        var affectedCnt = 1;

        apiResult.code = 200;
        apiResult.data = affectedCnt;
        apiResult.result = "OK";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);
});

router.get("/:mid", async (req, res, next) => {
    try {
        var mid = req.params.mid;
        // console.log("cid : " + cid);

        //임시 Data 
        var member = {
            member_id: 1,
            email: "am3ca723@gmail.com",
            member_password: "pass1234",
            name: "최유진",
            profile_img_path: "",
            telephone: "101-111-1111",
            entry_type_code: 1,
            use_state_code: 1,
            reg_date: Date.now(),
            reg_member_id: "yujin",
            edit_date: Date.now(),
            edit_member_id: "yujin"
        };

        apiResult.code = 200;
        apiResult.data = member;
        apiResult.result = "OK";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);
});

module.exports = router;
