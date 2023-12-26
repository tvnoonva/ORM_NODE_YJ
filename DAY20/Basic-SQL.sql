USE modu_chat;

#주석
#member 테이블의 전체 데이터 조회
SELECT * FROM member;

#CREATE DATA (INSERT)
INSERT INTO member(email,member_password,name,profile_img_path,
telephone, entry_type_code, use_state_code, birth_date, reg_date, reg_member_id)
VALUES('test1@test.co.kr','1234','강창훈','','010-1111-1111',1,1,'123123',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,
telephone, entry_type_code, use_state_code, birth_date, reg_date, reg_member_id)
VALUES('test2@test.co.kr','1234','강창훈2','','010-1111-1112',1,1,'123124',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,
telephone, entry_type_code, use_state_code, birth_date, reg_date, reg_member_id)
VALUES('test3@test.co.kr','1234','강창훈3','','010-1111-1113',1,1,'123125',now(),1);


#READ DATA (SELECT)
SELECT * FROM member;
SELECT * FROM member WHERE email='test1@test.co.kr';
SELECT * FROM member WHERE entry_type_code=1 AND name='강창훈';
SELECT * FROM member WHERE entry_type_code=1 OR use_state_code=0;
SELECT member_id,email,name,telephone FROM member WHERE member_id>=3;
SELECT * FROM member WHERE name IN('강창훈2','강창훈3','강창훈4');
SELECT * FROM member WHERE name Like '%강%'; 
#패턴매칭 %가 > 가로 시작하는 모든 항목 / %가% > 가를 포함한 모든 데이터 / 가% > 가로 끝나는 모든 데이터

SELECT * FROM member ORDER BY member_id DESC;
SELECT * FROM member ORDER BY member_id ASC;


#UPDATE DATA (UPDATE)
UPDATE member SET name='강창훈0', profile_img_path='http://naver.com/images/test.png' WHERE member_id=1;
UPDATE member SET use_state_code=0 WHERE member_id>2;


#DELETE DATA (DELETE)
DELETE FROM member WHERE email='test4@tset.co.kr';



set sql_safe_updates=0;