const odd = "홀수입니다.";
const even = "짝수입니다.";

//test 함수정의
//Terminal에 출력
function test(){
    console.log("Base1모듈의 test()함수가 호출되었습니다.");
}

console.log("base1모듈이 호출되었습니다.");

//base1 모듈에서 정의된 각종 상수/변수(속성)이나 기능을 외부로 노출해야 기능이 제공된다.
//module.exports를 통해 객체 형태로 해당 모듈의 기능과 속성을 노출한다.
module.exports ={

    //본래 odd:odd
    //속성명과 속성의 값의 이름이 동일해서 생략함
    odd,
    even,
    test
}
