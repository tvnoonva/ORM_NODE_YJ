//callback 지옥
//async/awwait 문법을 이용해 콜백 함수의 한계를 극복해보기

//
var fnHell=function(){
    console.log("로직1 완료");

    //두번째 로직
    setTimeout(function(){
        console.log("로직2 완료");

        //세번째 로직
        setTimeout(function(){
            console.log("로직3 완료");

            //네번째 로직
            setTimeout(function(){
                console.log("로직4 완료");

                setTimeout(function(){
                    console.log("로직5 완료");
                },1000)
            },1000)
        },1000)
    },1000)
}

//async-await 문법 이용
var fnHeaven=function(){
    console.log("로직1 완료");

    //두번째 로직
    setTimeout(function(){
        console.log("로직2 완료");
    },2000);

    //세번째 로직
    setTimeout(function(){
        console.log("로직3 완료");
    },3000);

    //네번째 로직
    setTimeout(function(){
        console.log("로직4 완료");
    },4000);

    //다섯번째 로직
    setTimeout(function(){
        console.log("로직5 완료");
    },5000);
}

//fnHell();
fnHeaven();