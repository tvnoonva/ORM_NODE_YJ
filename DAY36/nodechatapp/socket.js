const socketIO = require("socket.io");
const moment = require('moment');

module.exports = (server) => {
    const io = socketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", async (socket) => {
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
    })
}
