//자바스크립트 언어의 기본 특성 학습하기
//1. 자바스크립트는 기본적으로 비동기 프로그래밍 방식으로 작동

//Act1
function fn1(){
    console.log("======>fn1");
}

//Act2
function fn2(cb){
    //지정한 시간 후에 해당 함수 실행
    //fn2()가 호출되면 2초 대기 후 내부함수 실행
    setTimeout(function(){
        console.log("======>fn2");

        //fn2()의 모든 기능이 완료되면 fn3() 함수를 호출 >>실행순서 부여
        //fn3();
        //fn31("fn2에서 호출됨");
        cb();
    }, 2000);
}

//Act3
function fn3(){
    console.log("======>fn3");
}

//Act3-1
function fn31(){
    console.log("======>fn31:");
}

//Task1: fn1()+fn2()+fn3()
//순서와 상관없이 fn1,2,3을 실행할 경우(비동기식)
// fn1();
// fn2();
// fn3();

//Task2: 순서를 지켜가면서 비지니스로직을 구현해야 하는 경우(ex 업무프로세스)
//ex fn2()실행이 완전히 끝나고 fn3()을 실행시켜야 하는 경우
//fn2() 함수 내부(마지막줄)에서 직접 fn3()를 호출한다.
// fn1();
// fn2();


//Task3: Task2처럼 함수 내부에서 특정 함수를 호출할경우
//함수가 수정되면 매번 해당 함수의 기능을 변경해야하는 번거로움이 있다.
//자바스크립트 함수는 객체로 인식
fn1();
fn2(fn31);