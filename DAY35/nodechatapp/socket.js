//socket.io 팩키지 참조
const SocketIO = require("socket.io");
//socket.js모듈 기능정의
module.exports = (server) => {
    const io = SocketIO(server, { path: "/socket.io" });
    io.on("connection", (socket) => {

        //서버에서 메시지를 수신
        socket.on("broadcast", function (msg) {

            //서버 소켓에 연결된 모든 사용자에게 메시지 발송
            io.emit("receiveAll", msg);
            //socket.broadcast.emit("receive",msg);
        });
    });
}