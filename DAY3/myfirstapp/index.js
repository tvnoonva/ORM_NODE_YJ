//server에서 작동하는 자바스크립트 모듈 파일(백엔드 과정)


//설치한 오픈소스 노드 패키지를 참조한다.
//node.js에서는 require() 예약어를 통해 지정한 설치된 노드패키지를 참조한다.
const moment = require('moment');
//moment 패키지: 자바스크립트 일자/시간 정보를 개발자가 원하는 문자 포맷으로 표현해주는 패키지

const env = require('dotenv');
//dotenv 패키지: 해당 프로젝트/노드 어플리케이션의 환경설정정보에 접근해서 
//전역 어플리케이션 환경변수정보를 추출한다.

//프로젝트 루트에 있는 .env 환경설정파일에 정의된 각종 어플리케이션 환경변수를 메모리에 올린다
env.config();


//순수 자바스크립트 일시/시간정보 출력
console.log("순수자바스크립트 일시정보:",Date.now());

//moment 패키지를 이용해 자바스크립트 일시/시간정보 출력
console.log("모멘트 패키지를 통한 날짜포맷:",moment(Date.now()).format("YYYY-MM-DD hh:mm:ss"));
//console.log("모멘트 패키지를 통한 날짜포맷:",moment(Date.now()).format("YYYY-MM-DD HH:MM:SS"))


//.env파일내 특정 환경변수정보를 추출한다
const companyName = process.env.COMPANY_NAME;
console.log("지정한 환경변수 출력:", companyName);



/*
console.log("최초 생성한 노드 백엔드 자바스크립트 모듈 파일");
//clonsole.log: terminal에 로그를 출력하는 메소드

console.log("잘 로그가 출력되네요.");
console.log("배고파 죽겠어요.");
*/