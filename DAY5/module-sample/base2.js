//base1 모듈을 import 시키는 기능(require 예약어를 사용함)
//객체의 비구조화 할당
const {odd, even, test} = require('./base1.js');

//변수가 짝수인지 홀수인지 check해서 odd or even 값을 반환
function checkOddOrEven(num){
    if(num%2){
        return odd;
    }
    return even;
}

/*
var result=checkOddOrEven(10);
console.log("10은 "+result);
console.log(`10은 ${result}`);
*/

//단일 함수형태로 노출
module.exports=checkOddOrEven;