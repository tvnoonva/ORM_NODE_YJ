module.exports = function (sequelize, DataTypes) {

    //sequelize.define() 해당 모델 구조를 통해 물리적 테이벌을 생성시키는 기능제공
    //sequelize.define('테이블명-기본복수형으로생성(ex members)', 컬럼 구조 정의, 테이블 생성옵션);
    return sequelize.define(
        'member',
        {
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '회원고유번호',
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '사용자메일주소',
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '사용자메일주소',
            }
        },
        {
            timestamps: true, //등록일, 수정일 컬럼 자동생성
            paranoid: true //데이터 삭제 컬럼 자동 생성 및 물리적 데이터 삭제안함 기능제공
        });
};