//콜백함수 구현 및 테스트

//계산함수
function fnPlus(a,b){
    let c=a+b;
    loggin(c);
    return c;
}

//계산결과 출력
function logging(result){
    console.log(`계산 결과값은 ${result} 입니다.`);
}

//계산함수 호출
//var result=fnPlus(10,20);
//console.log("함수반환값: ",result);


//콜백함수 방식으로 기능구현하기
//기존 logging함수를 특정 함수에 파라미터로 전달해서 해당 함수내에서 실행
function fnPlus1(a,b,callback){
    let c=a+b;
    callback(c);
    return c;
}

//로직을 변경/추가하며 변경된 값을 출력
function logging1(result){
    var total=3000+result;
    console.log(`계산결과는 배송비가 추가되어 ${total} 원입니다.`);
}

var result1=fnPlus1(20,30,logging);
var result2=fnPlus1(20,30,logging1);

var result3=fnPlus1(20,30,function(result){
    var total=3000+result;
    console.log(`공백함수 직접구현: 계산결과는 배송비가 추가되어 ${total} 원입니다.`);
})

//콜백함수 사용목적
//비동기 방식으로 처리되는 자바스크립트 프로그래밍에서
//순차적인 프로그래밍(비지니스로직)을 구현하기 위해 
//함수에 특정 함수를 매개변수로 전달하여 해당 함수 내 특정 위치에서 
//전달된 콜백함수를 실행, 원하는 로직/절차를 순차적으로 구현 가능하다.

//객체지향 프로그래밍
//일반화
//추상화
//상속
//다형성
//캡슐화