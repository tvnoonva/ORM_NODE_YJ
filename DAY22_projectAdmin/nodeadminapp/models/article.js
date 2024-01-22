module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article',
        {
            article_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '게시글고유번호',
            },
            board_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시판구분코드',
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
                comment: '게시글제목',
            },
            article_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시글유형코드',
            },
            contents: {
                type: DataTypes.STRING(4000),
                allowNull: false,
                comment: '글내용',
            },
            view_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '뷰카운트',
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'IP주소',
            },
            is_display_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '게시상태코드',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시',
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호',
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호',
            }
        },
        {
            sequelize,
            tableName: 'article',
            timestamps: false,
            comment: '게시글정보',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'article_id' }], 
                },
            ],
        }
    );
};