var express = require("express");
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
var jwt = require('jsonwebtoken');

var { tokenAuthChecking } = require('./apiMiddleware');

var apiResult = {
    code: 200,
    data: null,
    result: ""
}

//로그인
//암호화 적용 / JWT 인증 토큰 발급 / 토큰 로컬스토리지 저장
router.post("/login", async (req, res, next) => {
    var email = await AES.encrypt(req.body.email, process.env.MYSQL_AES_KEY);
    var password = req.body.password;

    try {
        const member = await db.Member.findOne({
            where: { email: email },
            attributes: ['member_id', 'email', 'member_password', 'name', 'profile_img_path']
        });

        if (member) {
            if (await bcrypt.compare(password, member.member_password)) {
                //token 생성
                const token = await jwt.sign(
                    { member_id: member.member_id, email: email, name: member.name },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h', issuer: 'Ormcamp' }
                );
                //token 전달
                return res.json({ code: 200, data: token, result: "Login success" });
            } else {
                return res.json({ code: 400, data: null, result: "Password not correct" });
            };
        } else {
            return res.json({ code: 400, data: null, result: "Member not Found" });
        };

    } catch (err) {
        console.error('ERROR in login: ', err);
        return res.json({ code: 500, data: null, result: "Server ERROR in /login POST" });
    }
});

//신규가입
//암호화 적용(PW:단방향, telephone, email:양방향)
router.post("/entry", async (req, res, next) => {
    try {
        const member = {
            email: await AES.encrypt(req.body.email, process.env.MYSQL_AES_KEY),
            member_password: await bcrypt.hash(req.body.password, 12),
            name: req.body.name,
            profile_img_path: "",
            telephone: await AES.encrypt(req.body.telephone, process.env.MYSQL_AES_KEY),
            entry_type_code: 1,
            use_state_code: 1,
            reg_date: Date.now(),
            reg_member_id: 1
        };

        var isifExist = await db.Member.findOne({ where: { email: member.email } });

        if (isifExist) {
            return res.json({ code: 400, data: null, result: "You are already in Member" });
        } else {
            await db.Member.create(member);
            return res.json({ code: 200, data: member, result: "Member Entry Success" });
        }

    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /entry POST" });
    }
});

//암호 찾기
//email을 token에 전달할때는 decrypted 상태로 전달한다.
router.post('/find', async (req, res, next) => {
    var email = req.body.email;

    try {
        var encryptedEmail = await AES.encrypt(email, process.env.MYSQL_AES_KEY);
        const member = await db.Member.findOne({ where: { email: encryptedEmail } });
        if (!member) {
            return res.json({ code: 400, data: null, result: "Member not Found" });
        } else {
            const token = await jwt.sign({
                member_id: member.member_id,
                email: email,
                name: member.name
            }, process.env.JWT_SECRET, { expiresIn: '24h', issuer: 'Ormcamp' });

            //메일 전송
            console.log(token);

            return res.json({ code: 200, data: token, result: `Send email to ${email}.` });
        }
    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /find POST" });
    }

})


router.get("/all", tokenAuthChecking, async (req, res, next) => {
    try {
        var member_list = await db.Member.findAll();
        return res.json({ code: 200, data: member_list, result: "Get Data Successful" });

    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /all GET" });
    }
});

router.post("/create", tokenAuthChecking, async (req, res, next) => {

    try {
        const member = {
            email: await AES.encrypt(req.body.email, process.env.MYSQL_AES_KEY),
            member_password: await bcrypt.hash(req.body.member_password, 12),
            name: req.body.name,
            profile_img_path: req.body.profile_img_path,
            telephone: await AES.encrypt(req.body.telephone, process.env.MYSQL_AES_KEY),
            entry_type_code: req.body.entry_type_code,
            use_state_code: req.body.use_state_code,
            reg_date: Date.now(),
            reg_member_id: 1
        };

        await db.Member.create(member);
        return res.json({ code: 200, data: member, result: "Create success" });

    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /create POST" });
    }

});

router.post("/modify", tokenAuthChecking, async (req, res, next) => {
    try {
        var member_id = req.body.member_id;
        const member = await db.Member.findOne({ where: { member_id: member_id } });

        if (member) {
            member.email = await AES.decrypt(req.body.email, process.env.MYSQL_AES_KEY);
            member.member_password = await bcrypt.hash(req.body.member_password, 12);
            member.name = req.body.name;
            member.profile_img_path = req.body.profile_img_path;
            member.telephone = await AES.decrypt(req.body.telephone, process.env.MYSQL_AES_KEY);
            member.entry_type_code = req.body.entry_type_code;
            member.use_state_code = req.body.use_state_code;
            member.edit_date = Date.now();
            member.edit_member_id = 1;

            var affectedCnt = await db.Member.update(member, { where: { member_id: member_id } });
            return res.json({ code: 200, data: affectedCnt, result: "Member update complete" });

        } else {
            return res.json({ code: 400, data: null, result: "Member not Found" });
        }

    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /modify POST" });
    }
});

router.post("/delete/:mid", tokenAuthChecking, async (req, res, next) => {
    try {
        var member_id = req.params.mid;
        var affectedCnt = await db.Member.destroy({ where: { member_id: member_id } });
        return res.json({ code: 200, data: affectedCnt, result: "Delete Success" });

    } catch (err) {
        return res.json({ code: 500, data: null, result: "Server ERROR in /delete POST" });
    }

});

//프로필 정보 조회
router.get("/profile", tokenAuthChecking, async (req, res, next) => {
    try {
        let token = req.headers.authorization.split('Bearer ')[1];
        let tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

        const member = await db.Member.findOne({
            where: { email: tokenJsonData.email },
            attributes: ['email', 'name', 'profile_img_path', 'telephone', 'birth_date']
        });

        member.email = await AES.decrypt(member.email, process.env.MYSQL_AES_KEY);
        member.telephone = await AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

        if (member) {
            return res.json({ code: 200, data: member, result: "Get Data Successful" });
        } else {
            return res.json({ code: 400, data: null, result: "Member not Found" });
        };

    } catch (err) {
        console.error('Server ERROR in /api/member/profile GET', err);
        return res.json({ code: 500, data: null, result: "Server ERROR in /api/member/profile GET" });
    }
});

router.post("/changePwd", tokenAuthChecking, async (req, res, next) => {
    var password = req.body;
    try {
        let token = req.headers.authorization.split('Bearer ')[1];
        let tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

        const member = await db.Member.findOne({
            where: { email: tokenJsonData.email },
            attributes: ['member_id', 'email', 'password']
        });

        if (!member) return res.json({ code: 400, data: null, result: "Member not Found" });
        if (await bcrypt.compare(password.currentPwd, member.member_password)) {
            var updatemember = {
                member_password: await bcrypt.hash(newPwd, 12),
                edit_date: Date.now(),
                edit_member_id: member.member_id
            };
            await db.Member.update(updatemember,
                {
                    where: { member_id: member.member_id }
                });

            return res.json({ code: 200, data: 'success', result: "Password change success" });

        } else {
            return res.json({ code: 400, data: null, result: "Password is not correct" });
        };

    } catch (err) {
        console.error('Server ERROR in /api/member/changePwd POST', err);
        return res.json({ code: 500, data: null, result: "Server ERROR in /api/member/changePwd POST" });
    }
});

module.exports = router;
