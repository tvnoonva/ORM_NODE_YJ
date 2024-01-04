const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const article_file = new Schema({
    article_id: {
        type: Number,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    file_size: {
        type: Number,
        required: true,
    },
    file_path: {
        type: String,
        required: true,
    },
    file_type: {
        type: String,
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
});

article_file.plugin(AutoIncrement, { inc_field: "article_file_id" });

module.exports = mongoose.model('ArticleFile', article_file);
