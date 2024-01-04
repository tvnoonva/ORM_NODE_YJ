const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const member = new Schema({
    email: {
        type: String,
        required: true,
    },
    member_password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profile_img_path: {
        type: String,
        required: false,
    },
    telephone: {
        type: String,
        required: true,
    },
    entry_type_code: {
        type: Number,
        required: true,
    },
    use_state_code: {
        type: Number,
        required: true,
    },
    birth_date: {
        type: String,
        required: true,
    },
    reg_date: {
        type: Date,
        default: Date.now,
    },
    reg_member_id: {
        type: Number,
        required: true,
    },
    edit_date: {
        type: Date,
        default: Date.now,
    },
    edit_member_id: {
        type: Number,
        required: false,
    },
});

member.plugin(AutoIncrement, { inc_field: "member_id" });

module.exports = mongoose.model('Member', member);
