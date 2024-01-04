const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const admin_member = new Schema({
    company_code: {
        type: Number,
        required: true,
    },
    admin_id: {
        type: String,
        required: true,
    },
    admin_password: {
        type: String,
        required: true,
    },
    admin_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    dept_name: {
        type: String,
        required: true,
    },
    used_yn_code: {
        type: Number,
        required: true,
    },
    reg_date: {
        type: Date,
        default: Date.now,
    },
    reg_user_id: {
        type: Number,
        required: true,
    },
    edit_date: {
        type: Date,
        default: Date.now,
    },
    edit_user_id: {
        type: Number,
        required: false,
    },
});

admin_member.plugin(AutoIncrement, { inc_field: "admin_member_id" });

module.exports = mongoose.model('Admin', admin_member);
