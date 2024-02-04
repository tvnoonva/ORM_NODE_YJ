//contacts 탭 클릭시 유저 목록 가져오기
$('#contacts-tab').click(function () {
    var loginUserToken = localStorage.getItem("userauthtoken");
    $.ajax({
        type: 'GET',
        url: '/api/member/all',
        headers: {
            Authorization: `Bearer ${loginUserToken}`
        },
        dataType: 'json',
        success: function (result) {
            console.log("모든 사용자 정보 호출 결과: ", result);

            if (result.code == 200) {
                //li 태그 초기화
                $('.contacts-list').html("");
                $.each(result.data, function (index, user) {

                    var userTag = `<li onClick="fnChatEntry(${user.member_id},'${user.name}', 1);">
                    <a href="#">
                        <div class="contacts-avatar">
                            <span class="status busy"></span>
                            <img src="${user.profile_img_path}" alt="Avatar">
                        </div>
                        <div class="contacts-list-body">
                            <div class="contacts-msg">
                                <h6 class="text-truncate">${user.name}</h6>
                                <p class="text-truncate">${user.email}</p>
                            </div>
                        </div>
                        <div class="contacts-list-actions">
                            <div class="action-block">
                                <img src="img/dots.svg" alt="Actions">
                            </div>
                            <div class="action-list">
                                <span class="action-list-item">Chat User</span>
                                <span class="action-list-item">Remove User</span>
                            </div>
                        </div>
                    </a>
                </li>`;

                    $(".contacts-list").append(userTag);
                });

            } else {
                if (result.code == 400) {
                    alert(result.msg);
                }
            }
        },
        error: function (error) {
            console.log("백엔드 API호출 에러발생: ", error);
        }
    })
});


// -------------------------------------------------채팅방 구현 영역
// 채팅방 입장 함수
function fnChatEntry(memberID, nickName, channelType) {
    console.log("입장 사용자 정보:", memberID, nickName);

    //입장처리
    var channel = {
        channelType, //1:일대일, 2:그룹채널
        channelId: 0, //0:일대일채널, 0이상: 그룹채널
        token: localStorage.getItem("userauthtoken"),
        targetMemberId: memberID,
        targetMemberNickname: nickName
    };
    console.log("입장할 채널 정보: ",channel);
    socket.emit("entryChannel", channel);

    //채팅화면 UI표시
    $(".empty-chat-screen").addClass("d-none");
    $(".chat-content-wrapper").removeClass("d-none");
    // $(".users-container .users-list li").removeClass("active-chat");
    // $(this).addClass("active-chat");
};

//채팅영역 스크롤 최하단 이동함수
function chatScrollToBottom() {
    $("#chatScroll").scrollTop($("#chatScroll")[0].scrollHeight);
}

//버튼 클릭 시 메시지 수발신 소켓 channelMsg로 전송
$("#btnSend").click(function () {
    //임시 유저(추후 토큰에서 정보 추출)
    var data = {
        nickName:currentUser.name,
        memberId :currentUser.member_id,
        profile :currentUser.profile_img_path,
        channelId :currentChannel.channel_id,
        message :$("#txtMessage").val(),
    };

    console.log('전송data: ',data)
    socket.emit('channelMsg', data);
});

//채팅방 입장완료 메시지 수신기
socket.on("entryok", function (msg, nickName, channeldata) {
    console.log("현재 접속중인 채널 정보 수신:", channeldata);
    currentChannel = channeldata;
    var msgTag = `<li class="divider">${msg}</li>`;

    $("#chatHistory").append(msgTag);
    // chatScrollToBottom();
});

//채팅방 메시지 수신해서 pop시키기
socket.on("receiveChannelMsg", function (data, sendDate) {
    console.log("수신한 data: ",data);
    var className = currentUser.name ==data.nickName ? "chat-left" : "chat-right";
    var msgTag = `<li class='${className}'>
    <div class="chat-text-wrapper">
        <div class='chat-text'>
            <p>${data.message}</p>
            <div class='chat-hour read'>${sendDate} <span>&#10003;</span></div>
        </div>
    </div>
    <div class='chat-avatar'>
        <img src="${data.profile}" alt="Quick Chat Admin" />
        <div class='chat-name'>${data.nickName}</div>
    </div>
</li>`;

    //채팅 메시지 템플릿 추가
    $("#chatHistory").append(msgTag);

    //채팅영역 맨 하단으로 스크롤 이동처리 
    chatScrollToBottom();
});
// ------------------------------------------------------
