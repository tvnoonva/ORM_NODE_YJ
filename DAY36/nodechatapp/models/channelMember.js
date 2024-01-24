module.exports = function (sequelize, DataTypes) {
    return sequelize.define('channel_member',
        {
            channel_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '채널고유번호',
            },
            member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '사용자고유번호',
            },
            nick_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '사용자닉네임',
            },
            member_type_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '사용자유형 0:사용자 1:관리자',
            },
            active_state_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '접속상태코드 0:아웃 1:접속중',
            },
            last_contact_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '최근접속일시',
            },
            last_out_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '최근아웃일시',
            },
            connection_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '커넥션아이디',
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'IP주소',
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
            tableName: 'channel_member',
            timestamps: false,
            comment: '채팅채널사용자정보',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'channel_id'}, {name: 'member_id' }],
                },
            ],
        }
    );
};