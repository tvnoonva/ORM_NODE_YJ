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
                    alert(result.result);
                }
            }
        },
        error: function (error) {
            console.log("백엔드 API호출 에러발생: ", error);
        }
    })

});

//비밀번호 변경
// ***********button 클릭 인식 안됨 오류 나중에 고칠것*************** 
$("changePwdBtn").click(function(){
    var password = {
        currentPwd: $("#currentPwd").val(),
        newPwd: $("#newPwd").val(),
        confirmPwd: $("#confirmPwd").val(),
    };

    $.ajax({
        type: 'POST',
        url: '/api/member/changePwd',
        headers: {
            Authorization: `Bearer ${loginUserToken}`
        },
        data: password,
        success: function(result){
            console.log("현재 사용자 정보 호출 결과: ", result);

            if(result.code==200){
                alert("비밀번호가 변경되었습니다.");
            } else{
                alert(result.result);
            }
        },
        error: function(error){
            console.log("백엔드 API호출 에러발생: ", error);
        }
    })
})