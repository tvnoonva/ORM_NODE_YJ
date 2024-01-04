const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const channel_member = new Schema({
    channel_id: {
        type: Number,
        required: true,
    },
    member_id: {
        type: Number,
        required: true,
    },
    nick_name: {
        type: String,
        required: true,
    },
    member_type_code: {
        type: Number,
        required: true,
    },
    active_state_code: {
        type: Number,
        required: true,
    },
    last_contact_date: {
        type: Date,
        default: Date.now,
    },
    last_out_date: {
        type: Date,
        default: Date.now,
    },
    connection_id: {
        type: String,
        required: true,
    },
    ip_address: {
        type: String,
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

module.exports = mongoose.model('ChannelMember', channel_member);
