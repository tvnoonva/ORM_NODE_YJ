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

                $("#email").val(result.data.email);
                $("#member_name").val(result.data.name);
                $("#telephone").val(result.data.telephone);
                $("#profile_img").attr("src", result.data.profile_img_path);

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


// 채팅방 입장 함수
function fnChatEntry(memberID, nickName, channelType){
    console.log("입장 사용자 정보:", memberID, nickName);

    //입장처리
    var channel = {
        channelType,
        channelId:0, //0:일대일채널, 0이상: 그룹채널
        token:localStorage.getItem("userauthtoken"),
        targetMemberId:memberID,
        targetMemberNickname:nickName
    };
    socket.emit("entryChannel", channel);
	$(".empty-chat-screen").addClass("d-none");
	$(".chat-content-wrapper").removeClass("d-none");
	$(".users-container .users-list li").removeClass("active-chat");
	$(this).addClass("active-chat");
};



$("#btnSend").click(function () {

    //임시 유저(추후 토큰에서 정보 추출)
    var nickName = currentUsser.name;
    var message = $("#txtMessage").val();

    socket.emit('test', nickName, message);
});

socket.on("receiveTest", function (nickName, message, sendDate) {
    var msgTag = currentUsser.name == nickName ? `<li class='chat-right'>
                        <div class="chat-text-wrapper">
                            <div class='chat-text'>
                                <p>${message}</p>
                                <div class='chat-hour read'>${sendDate} <span>&#10003;</span></div>
                            </div>
                        </div>
                        <div class='chat-avatar'>
                            <img src="img/user24.png" alt="Quick Chat Admin" />
                            <div class='chat-name'>${nickName}</div>
                        </div>
                    </li>` : `<li class='chat-left'>
                        <div class='chat-avatar'>
                            <img src="img/user21.png" alt="Quick Chat Admin" />
                            <div class='chat-name'>${nickName}</div>
                        </div>
                        <div class="chat-text-wrapper">
                            <div class='chat-text'>
                                <p>${message}</p>
                                <div class='chat-hour read'>${sendDate} <span>&#10003;</span></div>
                            </div>
                        </div>
                    </li>`;
    $("#chatHistory").append(msgTag);

    //채팅 영역 스크롤 아래로 
    chatScrollToBottom();
});


socket.on("entryok", function(msg,nickName){
    var msgTag = `<li class="divider">${msg}</li>`;

    $("#chatHistory").append(msgTag);
    chatScrollToBottom();
});


//채팅영역 스크롤 최하단 이동시키기
function chatScrollToBottom() {
    $("#chatScroll").scrollTop($("#chatScroll")[0].scrollHeight);
}

//환경설정 아이콘 클릭시 백엔드에서 프로필정보 조회 바인딩하기
$("#settings-tab").click(function () {

    //웹브라우저 로컬스토리지에 저장된 사용자인증 JWT토큰정보 추출하기
    var loginUserToken = localStorage.getItem("userauthtoken");

    $.ajax({
        type: 'GET',
        url: '/api/member/profile',
        headers: {
            Authorization: `Bearer ${loginUserToken}`
        },
        dataType: 'json',
        success: function (result) {
            console.log("현재 사용자 정보 호출 결과: ", result);

            if (result.code == 200) {
                $("#email").val(result.data.email);
                $("#member_name").val(result.data.name);
                $("#telephone").val(result.data.telephone);

                $("#profile_img").attr("src", result.data.profile_img_path);
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