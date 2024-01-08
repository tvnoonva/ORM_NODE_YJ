var express = require("express");
var router = express.Router();
const Member = require('../schemas/member');

var apiResult = {
    code: 200,
    data: [],
    result: "OK"
}

router.get("/all", async (req, res, next) => {
    try {
        var member_list = await Member.find({});

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
        var member = {
            email:req.body.email,
            member_password:req.body.member_password,
            name:req.body.name,
            profile_img_path:req.body.profile_img_path,
            telephone:req.body.telephone,
            entry_type_code:req.body.entry_type_code,
            use_state_code:req.body.use_state_code,
            reg_date: Date.now(),
            reg_member_id:1,
        };

        await Member.create(member);

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
        var member_id = req.body.member_id
        
        var member = {
            email:req.body.email,
            member_password:req.body.member_password,
            name:req.body.name,
            profile_img_path:req.body.profile_img_path,
            telephone:req.body.telephone,
            entry_type_code:req.body.entry_type_code,
            use_state_code:req.body.use_state_code,
            edit_date: Date.now(),
            edit_member_id:2,
        };

        var affectedCnt = await Member.updateOne({member_id:member_id}, member);

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
        var affectedCnt = await Member.deleteOne({member_id:member_id});

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
        var member_list = await Member.find({member_id:mid});
        var member = member_list[0];

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
