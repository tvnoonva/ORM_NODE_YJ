var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');

module.exports = passport => {
   //passport.use(new LocalStrategy('로그인화면의 아이디/암호 UI요소의 네임값설정',
   //로그인 처리함수정의(userID,userPWD,후행콜백함수)));
   passport.use(new LocalStrategy({
      usernameField: 'admin_id',
      passwordField: 'password'
   }, async (adminId, adminPWD, done) => {

      //로그인 기능 구현
      try {
         console.log("ID: ",adminId);
         var member = await db.Admin.findOne({where:{admin_id:adminId}});

         if (member) {
            if (await bcrypt.compare(adminPWD, member.admin_password)) {
               var sessionLoginData = {
                  admin_member_id: member.admin_member_id,
                  company_code: member.company_code,
                  admin_id: member.admin_id,
                  admin_name: member.admin_name
               };

               //done(null, 세션으로 지정할 세션데이터);
               done(null, sessionLoginData);
            } else {
               //done(null, 사용자 세션데이터 없으면 false, 추가옵션데이터);
               done(null, false, { message: 'Password not correct.' });
            }
         } else {
            done(null, false, { message: 'Member not found' });
         }
      } catch (err) {
         done(err);
      }
   }));
};