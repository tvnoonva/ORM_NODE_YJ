//mongoose패키지 참조
const mongoose = require('mongoose');

//자동채번 기능을 위한 mongoose-sequence 패키지 설치하고 참조
//npm i mongoose-sequence@5.3.1
//mongoose-sequence 기능을 이용하면 MongoDB에 counters콜렉션이 자동생성되고 자동채번번호를 관리해준다
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

//Schema 클래스를 생성할때 생성자함수에 새로 만들 콜렉션의 스키마(데이터구조)를 정의
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    article_type_code: {
        type: Number,
        required: true,
    },
    contents: {
        type: String,
        required: false,
    },
    view_count: {
        type: Number,
        required: true,
    },
    is_display_code: {
        type: Number,
        required: true,
    },
    ip_address: {
        type: String,
        required: false,
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

//자동채번 컬럼생성 및 콜렉션에 추가
articleSchema.plugin(AutoIncrement, { inc_field: "article_id" }); //article_id는 1,2,3,4..

//mongoose
module.exports = mongoose.model('Article', articleSchema);

