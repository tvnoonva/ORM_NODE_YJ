var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');

module.exports = passport => {
   passport.use(new LocalStrategy({
      usernameField: 'adminId',
      passwordField: 'password'
   }, async (adminId, adminPWD, done) => {

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

               done(null, sessionLoginData);
            } else {
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