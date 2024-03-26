SELECT * FROM book;
SELECT * FROM customer;
SELECT * FROM imported_book;
SELECT * FROM orders;

#distinct는 해당컬럼의 중복값을 제외한 목록을 조회
SELECT distinct publisher FROM book;

SELECT * FROM book WHERE price<20000;

#특정 컬럼 값의 범위를 기준으로 조건절 조회
#지정된 값 이상 이상이하 범위 = BETWEEN 10000 AND 20000;
SELECT * FROM book WHERE price BETWEEN 10000 AND 200000;
SELECT * FROM book WHERE price >=10000 AND price <=20000;

SELECT * FROM book WHERE publisher IN('굿스포츠', '대한미디어');
SELECT * FROM book WHERE publisher = '굿스포츠' OR publisher='대한미디어';
SELECT * FROM book WHERE publisher NOT IN('굿스포츠', '대한미디어');

#패턴매칭
#텍스트가 여자로 끝나는 책을 조회
SELECT bookname, publisher FROM book WHERE bookname LIKE '%여자';
#텍스트가 축구로 시작하는 책을 조회
SELECT bookname, publisher FROM book WHERE bookname LIKE '축구%';
#축구라는 글자가 들어가는 모든 책 조회
SELECT bookname, publisher FROM book WHERE bookname LIKE '%축구%';
#O구 라는 글자(야구, 축구 등)로 시작하는 책을 조회
SELECT bookname, publisher FROM book WHERE bookname LIKE '_구%';

SELECT * FROM book WHERE publisher='굿스포츠' OR publisher='대한미디어' OR bookname='야구의 추억';

#데이터 조회 정렬 처리 
#order by 설정이 없을시 기본 ASC(오름차순, AB, CD, 가나다라...)
SELECT * FROM book ORDER BY bookname;
#오름차순
SELECT * FROM book ORDER BY bookname ASC;
#내림차순
SELECT * FROM book ORDER BY bookname DESC;
#정렬 후 정렬
SELECT * FROM book ORDER BY price DESC, publisher ASC;

#통계함수
SELECT * FROM orders;

SELECT SUM(saleprice) AS 총매출 FROM orders;
SELECT SUM(saleprice) AS Totalprice FROM orders;

SELECT SUM(saleprice) AS total,
AVG(saleprice) AS average,
MIN(saleprice) AS minimum,
MAX(saleprice) AS maximum
FROM orders;

#총 주문건수 조회
SELECT COUNT(*) AS order_cnt FROM orders;

#데이터 그룹중 특정 컬럼값을 기준으로 그룹핑하고 그룹핑한 결과의 통계조회시 group by
SELECT custid, COUNT(*) AS 주문도서수량, SUM(saleprice) AS 총판매가
FROM orders 
GROUP BY custid
HAVING COUNT(*) >=2
ORDER BY custid;

#-----------------------------------------------------------------
#여러개 테이블을 통합해서 데이터를 가져올 때 사용하는 JOIN 구문
#INNER JOIN: 조건이 일치하는 컬럼에서 모든 ROW를 조회
SELECT * FROM customer, orders;

SELECT * FROM customer C INNER JOIN orders O
ON C.custid=O.custid;

#inner join 결과물에서 특정 테이블의 컬럼만 조회하기
SELECT customer.custid, customer.name, customer.address, customer.phone, orders.orderid, saleprice, orders.orderdate
FROM customer, orders
WHERE customer.custid=orders.custid;

#join 테이블에서 컬럼 조회시 동일 컬럼이 존재하는 경우 테이블명을 명시해서 컬럼을 지정해야 한다.
SELECT customer.custid, name, address, phone, orderid, saleprice, orderdate, book.bookid, book.bookname, book.publisher
FROM customer, orders, book
WHERE customer.custid=orders.custid AND orders.bookid=book.bookid;

#OUTER JOIN
#LEFT OUTER JOIN과 RIGHT OUTER JOIN으로 나뉜다
#LEFT OUTER JOIN: 조인하는 테이블의 왼쪽 테이블 데이터를 모두 표현하고 오른쪽은 테이블에 일치하는 값이 없으면 NULL로 표시
#RIGHT OUTER JOIN: LEFT JOIN과 같으나 기준 테이블이 오른쪽 테이블

#customer와 orders를 outer join한다. 조건은 custid의 값으로 조인 컬럼에 일치하지 않은 건도 모두 포함한다.
#outer join은 기본적으로 조인 조건의 값이 일치하는 row는 모두 출력하고(inner join 포함), 서로 일치하지 않은 항목들도 일단 모두 출력한다.
SELECT * FROM customer LEFT OUTER JOIN orders
ON customer.custid=orders.custid;

SELECT * FROM customer RIGHT OUTER JOIN orders
ON customer.custid=orders.custid;


#subQuery 서브쿼리
SELECT bookname, price FROM book WHERE price=20000;

#조건절 값을 서브쿼리를 이용해 가져온다 컬럼명=(서브쿼리)
#서브쿼리 사용시에는 조건에 해당하는 컬럼의 결과값(비교값)과 동일한 데이터형식의 결과값을 서브쿼리에서 반환해야한다
#가장 고가의 책 조회
SELECT bookname, price FROM book 
WHERE price=(SELECT MAX(price) FROM book);

#한번 이상 주문한 모든 사용자정보 조회 
SELECT * FROM customer
WHERE custid IN(SELECT custid FROM orders);

SELECT * FROM customer
WHERE custid IN(SELECT custid FROM orders WHERE bookid IN(SELECT bookid FROM book WHERE publisher='대한미디어'));


#UNION JOIN: 2개 이상의 쿼리의 결과물을 병렬로 병합하는 기능
#동합하려는 쿼리의 컬럼구조가 일치해야 수직통합이 된다.
SELECT * FROM customer WHERE custid IN(1,2,3)
UNION
SELECT * FROM customer WHERE custid IN(4,5);

#대한민국에 거주하는 사용자조회
SELECT name FROM customer WHERE address LIKE '대한민국%'
UNION
#한건이라도 주문내역이 있는 사용자 조회
SELECT name FROM customer WHERE custid IN(SELECT custid FROM orders);

#UNION ALL은 병합시 중복된 데이터를 모두 출력한다
SELECT name FROM customer WHERE address LIKE '대한민국%'
UNION ALL
SELECT name FROM customer WHERE custid IN(SELECT custid FROM orders);