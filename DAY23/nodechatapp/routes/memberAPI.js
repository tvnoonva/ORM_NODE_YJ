var express = require("express");
var router = express.Router();
var db = require('../models/index');

var apiResult = {
    code: 200,
    data: null,
    result: ""
}

router.get("/all", async (req, res, next) => {
    try {
        var member_list = await db.Member.findAll();

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
            member_id:req.body.member_id,
            email:req.body.email,
            member_password:req.body.member_password,
            name:req.body.name,
            profile_img_path:req.body.profile_img_path,
            telephone:req.body.telephone,
            entry_type_code:req.body.entry_type_cod,
            use_state_code:req.body.use_state_code,
            reg_date: Date.now(),
            reg_member_id:1
        };

        await db.Member.create(member);

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
        var member = {
            member_id:req.body.member_id,
            email:req.body.email,
            member_password:req.body.member_password,
            name:req.body.name,
            profile_img_path:req.body.profile_img_path,
            telephone:req.body.telephone,
            entry_type_code:req.body.entry_type_cod,
            use_state_code:req.body.use_state_code,
            edit_date: Date.now(),
            edit_member_id:1
        };

        var affectedCnt = await db.Member.update(member, {where:{member_id:member_id}});

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

router.post("/delete/:mid", async (req, res, next) => {
    try {
        var member_id = req.params.mid;

        var affectedCnt = await db.Member.destroy({where:{member_id:member_id}});

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
        var member_id = req.params.mid;
        
        var member = await db.Member.findOne({where:{member_id:member_id}});

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
