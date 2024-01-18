const socketIO = require("socket.io");
var redis = require("socket.io-redis");

module.exports = (server) => {
    //SocketIO('백엔드 서버객체','제공될 클라이언트스크립트 소켓 라이브러리경로')
    //클라이언트 스크립트 socket 라이브러리: http://localhost:3000/socket.io.js (Client 측 socket.io 통신모듈)
    // const io = socketIO(server, { path: "/socket.io" });

    //CORS 지원 IO객체생성
    const io = socketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    //Redis Backplain 연결설정
    io.adapter(
        redis({
            host: "127.0.0.1",
            port: "6379",
            password: "1234"
        })
    );

    //io.on('이벤트명', 이벤트처리 콜백함수());
    //io서버소켓이 클라이언트와 연결이 완료되면 메세지 수발신 기능을 제공
    //소켓은 반드시 클라이언트와 연결이 된 상태에서만 메세지를 주고받을 수 있다.
    //io 서버 소켓이 connection 이벤트가 발생한 범위 안에서 각종 기능을 구현한다.
    //클라이언트-서버소켓간 연결이 완료되면 클라이언트/서버연결 정보를 가진 socket 객체가 전달
    //io는 서버소켓 그 자체, socket은 각각의 클라이언트와 연결된 연결정보객체
    io.on("connection", async (socket) => {

        //서버소켓과 연결된 각각의 클라이언트간 수발신 기능 구현
        //socket.on('메시지 수신기 이벤트명', 처리기 콜백함수());
        socket.on("broadcast", async (msg) => {
            //io.emit('이벤트 수신기명', data)
            //현재 서버소켓인 io에 연결된 모든 사용자에게 지정한 클라이언트 이벤트 수신기명에 해당 메시지 데이터를 보낸다.
            io.emit("receiveAll", msg);
        });

        //테스트용 서버측 이벤트 수신기 정의
        socket.on("test", async (msg) => {
            io.emit("receiveTest", msg);
        });

        socket.on("entry", async (channelId, nickName) => {
            //socket.join('채팅방 고유아이디')
            //socket.join()동일 채널id가 없으면 해당 채팅방을 만들고 있으면 해당채널로 접속
            socket.join(channelId);

            //채널 입장 사실을 사용자에게 알리는 3가지 방법(선별적 메시지 전달)
            //1. 현재 접속한 사용자(나)에게만 메시지 전달
            //socket.emit('이벤트수신기', data);
            socket.emit('entryok', `${nickName} 대화명으로 입장했습니다.`);

            //2. 현재 접속한 나를 제외한 나머지 사용자들에게 메시지 전달
            //socket.to('채널id').emit('이벤트수신기',data);
            socket.to(channelId).emit('entryok', `${nickName}님이 채팅방에 입장했습니다.`);

            //3. 나를 포함한 모든 사용자에게 메시지 전달
            io.to(channelId).emit('entryok', `[전체메시지] ${nickName}님이 채팅방에 입장했습니다.`);
        });

        //json data 수신
        socket.on("groupMsg", async (msgData) => {
            var sendMsg = `${msgData.nickName}:${msgData.message}`;
            console.log(sendMsg);
            io.to(msgData.channelId).emit("receiveGroupMsg", sendMsg);
        });
    })
}
