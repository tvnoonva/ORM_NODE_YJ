var express = require("express");
var router = express.Router();
var db = require('../models/index');

var apiResult = {
    code: 200,
    data: null,
    result: ""
}

router.post("/login", async(req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;

    try{
        const member = await db.Member.findOne({
            where:{email:email},
            attributes:['email', 'member_password']
        });

        if(member){
            if(password==member.member_password){
                apiResult.code=200;
                apiResult.data=member.email;
                apiResult.result="Login Success";
            }else{
                apiResult.code=400;
                apiResult.data=null;
                apiResult.result="Password not correct";
            };

        }else{
            apiResult.code=400;
            apiResult.data=null;
            apiResult.result="Member not Found";
        };

    }catch(err){
        apiResult.code=500;
        apiResult.data=null;
        apiResult.result="Failed";
    }

    console.log(apiResult);

    res.json(apiResult);
});

router.post("/entry", async(req, res, next)=>{
    try{
        var member = {
            email: req.body.email,
            member_password: req.body.password,
            name: req.body.name,
            profile_img_path: "",
            telephone: "",
            entry_type_code: 1,
            use_state_code: 1,
            reg_date: Date.now(),
            reg_member_id: 1
        };

        await db.Member.create(member);

        apiResult.code = 200;
        apiResult.data = member;
        apiResult.result = "Member Entry Success";

    }catch(err){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);
});


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
            email: req.body.email,
            member_password: req.body.member_password,
            name: req.body.name,
            profile_img_path: req.body.profile_img_path,
            telephone: req.body.telephone,
            entry_type_code: req.body.entry_type_cod,
            use_state_code: req.body.use_state_code,
            reg_date: Date.now(),
            reg_member_id: 1
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
        var member_id = req.body.member_id;
        var member = await db.Member.findOne({ where: { member_id: member_id } });

        if (member) {
            member.email = req.body.email;
            member.member_password = req.body.member_password;
            member.name = req.body.name;
            member.profile_img_path = req.body.profile_img_path;
            member.telephone = req.body.telephone;
            member.entry_type_code = req.body.entry_type_cod;
            member.use_state_code = req.body.use_state_code;
            member.edit_date = Date.now();
            member.edit_member_id = 1;

            var affectedCnt = await db.Member.update(member, { where: { member_id: member_id } });

            apiResult.code = 200;
            apiResult.data = affectedCnt;
            apiResult.result = "Member update complete";

        } else {

            apiResult.code = 400;
            apiResult.data = null;
            apiResult.result = "Member not Found";
        }



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

        var affectedCnt = await db.Member.destroy({ where: { member_id: member_id } });

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
        var member = await db.Member.findOne({ where: { member_id: member_id } });

        if (member) {
            apiResult.code = 200;
            apiResult.data = member;
            apiResult.result = "OK";
        } else {
            apiResult.code = 400;
            apiResult.data = null;
            apiResult.result = "Member not Found";
        };

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    res.json(apiResult);
});

module.exports = router;
