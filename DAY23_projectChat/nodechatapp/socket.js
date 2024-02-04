const socketIO = require("socket.io");
const moment = require('moment');
const jwt = require('jsonwebtoken');
const db = require('./models/index');

module.exports = (server) => {
    const io = socketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", async (socket) => {
        //현재 연결 사용자 전역변수 정의 사용
        //소켓Req객체
        const req = socket.request;

        //접속 클라이언트 IP주소
        const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;//사용자IP
        const socketId = socket.id; //현재 연결 사용자의 고유 Connection ID 조회

        //자동 연결 해제 및 서버 자원정리 처리 함수
        socket.on('disconnect', async () => {
            await UserConnectionOut();
            clearInterval(socket.interval);
        });

        //소켓통신 에러 감지 이벤트 핸들러
        socket.on('error', async (error) => {
            console.log("서버 소켓 에러발생 이벤트 감지기....");
        });

        // -----------------------------------------SAMPLE CODE
        
        socket.on("entry", async (channelId, nickName) => {
            socket.join(channelId);
            socket.emit('entryok', `${nickName} 대화명으로 입장했습니다.`);

            socket.to(channelId).emit('entryok', `${nickName}님이 채팅방에 입장했습니다.`);

            // io.to(channelId).emit('entryok', `[전체메시지] ${nickName}님이 채팅방에 입장했습니다.`);
        });

        socket.on("groupMsg", async (msgData) => {
            var sendMsg = `${msgData.nickName}:${msgData.message}`;
            console.log(sendMsg);
            io.to(msgData.channelId).emit("receiveGroupMsg", sendMsg);
        });
        // -------------------------------------------

        //채팅방 입장
        socket.on("entryChannel", async (channel) => {
            try {
                var channeldata = {};
                var currentUser = jwt.verify(channel.token, process.env.JWT_SECRET);
                console.log(currentUser);

                //일대일 채널의 경우 생성
                if (channel.channelType == 1) {
                    //1:1 채널의 경우 채널명을 'ID-ID'(*내림차순)으로 자동생성
                    var channelName = channel.targetMemberId < currentUser.member_id ?
                        `${channel.targetMemberId}-${currentUser.member_id}` : `${currentUser.member_id}-${channel.targetMemberId}`;
                    //일대일채널 서치
                    channeldata = await db.Channel.findOne({
                        where: { channel_name: channelName, category_code: 1 }
                    });
                    console.log(`${channelName} 채널 조회 결과: `, channeldata);

                    //채널이 없는 경우 생성
                    if (!channeldata) {
                        var channelInfo = {
                            community_id: 1,
                            category_code: channel.channelType,
                            channel_name: channelName,
                            user_limit: 2,
                            channel_state_code: 1,
                            reg_date: Date.now(),
                            reg_member_id: currentUser.member_id
                        };
                        var registedChannel = await db.Channel.create(channelInfo);
                        console.log('채널 정보: ',registedChannel);

                        //채널 정보 업데이트
                        channeldata = registedChannel;

                        var currentMember = {
                            channel_id: registedChannel.channel_id,
                            member_id: currentUser.member_id,
                            nickName: currentUser.name,
                            member_type_code: 1,
                            active_state_code: 0,
                            connection_id: "",
                            ip_address: "",
                            edit_date: Date.now(),
                            edit_member_id: currentUser.member_id
                        };
                        await db.ChannelMember.create(currentMember);

                        var targetMember = {
                            channel_id: registedChannel.channel_id,
                            member_id: channel.targetMemberId,
                            nickName: channel.targetMemberNickname,
                            member_type_code: 0,
                            active_state_code: 0,
                            connection_id: "",
                            ip_address: "",
                            edit_date: Date.now(),
                            edit_member_id: currentUser.member_id
                        };
                        await db.ChannelMember.create(targetMember);
                    }
                } else { //그룹채팅일 경우 조회
                    
                }
                //STEP2 현재 채팅방 접속자 정보 조회 및 정보 업데이트
                var updateMember = {
                    active_state_code: 1,
                    last_contact_date: Date.now(),
                    connection_id: socketId,
                    ip_address: userIP
                };
                await db.ChannelMember.update(updateMember, {
                    where: { channel_id: channeldata.channel_id, member_id: currentUser.member_id }
                });

                //STEP3 채널 조인
                socket.join(channeldata.channel_id);

                //STEP4 결과발송
                socket.emit('entryok', `${currentUser.name} 대화명으로 입장했습니다.`, currentUser.name);
                socket.to(channeldata.channel_id).emit('entryok', `${currentUser.name}님이 채팅방에 입장했습니다.`, currentUser.name);

                //입장기록 저장
                //입장기록 함수에 정보가 전달이 안되는 오류 발생중
                await ChattingMsgLogging(channeldata.channel_id, currentUser.member_id, currentUser.name, 1, `${currentUser.name}님이 채팅방에 입장했습니다`);

            } catch (err) {
                console.log("채널 입장에러 발생:", err);

                socket.emit("entryok", `채널 접속오류가 발생했습니다.`);
            }
        });

        //채팅방별 메시지 수신발신 처리
        socket.on("channelMsg", async (data) => {
            try {
                console.log('받은 data: ', data);
                var sendDate = moment(Date.now()).format('HH:mm');
                io.to(data.channelId).emit("receiveChannelMsg", data, sendDate);

                //채팅 이력 로그 기록
                await ChattingMsgLogging(data);
            } catch (err) {
                console.log("메시지 수신에러 발생:", err);
                socket.emit("error");
            }
        });

        //채팅 이력 로깅 함수
        async function ChattingMsgLogging(data) {
            try {
                var msg = {
                    channel_id: data.channelId,
                    member_id: data.memberId,
                    nick_name: data.nickName,
                    msg_type_code: 2,
                    connection_id: socketId,
                    ip_address: userIP,
                    message: data.message,
                    top_channel_msg_id: 0,
                    msg_state_code: 1,
                    msg_date: Date.now(),
                };
                console.log('DB저장정보: ', msg);
                await db.ChannelMessage.create(msg);
            } catch (err) {
                console.error("채널 loggin ERROR: ", err);
            }
        };

        //사용자 나가기
        async function UserConnectionOut() {
            var member = await db.ChannelMember.findOne({ where: { connection_id: socketId } });

            if (member != null) {

                //사용자 연결 끊김 정보 수정반영하기 
                var updateMember = {
                    active_state_code: 0,
                    last_out_date: Date.now(),
                    connection_id: socketId,
                    ip_address: userIP
                };

                await db.ChannelMember.update(updateMember, {
                    where: { connection_id: socketId }
                });

                //채팅방 퇴장 로그 기록
                await ChattingMsgLogging(member.channel_id, member.member_id, member.nick_name, 0, `${member.nick_name}님이 채팅방을 퇴장했습니다`);

            }
        }
    })
}
