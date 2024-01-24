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

        socket.on('disconnect',async()=>{
            //개발자 정의 현재 접속자 연결 끊김 처리함수 
            await UserConnectionOut();
            // 소켓 끊김시 서버측 자원정리 기능제공
            clearInterval(socket.interval);
        }); 

        //소켓통신 에러 감지 이벤트 핸들러
        socket.on('error',async(error)=>{
            console.log("서버 소켓 에러발생 이벤트 감지기....");
        }); 

        // -----------------------------------------
        socket.on("broadcast", async (msg) => {
            io.emit("receiveAll", msg);
        });

        socket.on("test", async (nickName, msg) => {
            var sendDate = moment().format('YYYY-MM-DD hhMMss');
            io.emit("receiveTest", nickName, msg, sendDate);
        });

        socket.on("entry", async (channelId, nickName) => {
            socket.join(channelId);
            socket.emit('entryok', `${nickName} 대화명으로 입장했습니다.`);

            socket.to(channelId).emit('entryok', `${nickName}님이 채팅방에 입장했습니다.`);

            io.to(channelId).emit('entryok', `[전체메시지] ${nickName}님이 채팅방에 입장했습니다.`);
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

                //STEP1 채널 유형별 채널정보 생성 혹은 조회
                //일대일 채널의 경우 생성, 그룹 채널은 조회
                if (channel.channelType == 1) {
                    //1:1 채널의 경우 채널명을 'ID-ID'(*내림차순)으로 자동생성
                    var channelName = channel.targetMemberId < currentUser.member_id ?
                        `${channel.targetMemberId}-${currentUser.member_id}` : `${currentUser.member_id}-${channel.targetMemberId}`;
                    //일대일채널 서치
                    channeldata = await db.Channel.findOne({
                        where: { channel_name: channelName, category_code: 1 }
                    });
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

                        //채널 정보 업데이트
                        channeldata = registedChannel;

                        var currnetMember = {
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
                } else {
                    //그룹
                    //채널 고유번호로 조회해서 channelData에 할당
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
                socket.emit('entryok', `${currentUser.name} 대화명으로 입장했습니다.`,currentUser.name);
                socket.to(channeldata.channel_id).emit('entryok', `${currnetMember.name}님이 채팅방에 입장했습니다.`,currentUser.name);

                //입장기록 저장
                await ChattingMsgLogging(channelData.channel_id,currentUser.member_id,currentUser.name,1,`${currentUser.name}님이 채팅방에 입장했습니다`);

            } catch (err) {
                console.log("채널 입장에러 발생:",err);

                socket.emit("entryok", `채널 접속오류가 발생했습니다.`);
            }
        });

        //채팅방별 메시지 수신발신 처리
        socket.on("channelMsg", async(channelId, memberId, nickName, profile, message)=>{
            var sendDate = moment(Date.now()).format('HH:mm');

            io.to(channelId).emit("receiveChannelMsg", nickName, profile, message, sendDate);

            //채팅 이력 로그 기록
            await ChattingMsgLogging(channelId, memberId, nickName,2, message);
        });

        //채팅 이력 로깅 함수
        async function ChattingMsgLogging(channelId, memberId, nickName, msgTypeCode, msg){
            var msg = {
                channel_id:channelId,
                member_id:memberId,
                nick_name:nickName,
                msg_type_code:msgTypeCode,
                connection_id:socketId,
                ip_address:userIP,
                message:msg,
                msg_state_code:1,
                msg_date:Date.now(),
            };
            await db.ChannelMessage.create(msg);
        };

        //사용자 나가기
        async function UserConnectionOut(){
            var member = await db.ChannelMember.findOne({where:{connection_id:socketId}});

            if(member != null){

                //사용자 연결 끊김 정보 수정반영하기 
                var updateMember = {
                    active_state_code:0,
                    last_out_date:Date.now(),
                    connection_id:socketId,
                    ip_address:userIP
                };

                await db.ChannelMember.update(updateMember,{
                    where:{connection_id:socketId}
                });

                //채팅방 퇴장 로그 기록
                await ChattingMsgLogging(member.channel_id,member.member_id,member.nick_name,0,`${member.nick_name}님이 채팅방을 퇴장했습니다`);

            }
        }
    })
}
