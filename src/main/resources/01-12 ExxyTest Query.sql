--기존 테이블 변경

--    task_item : score
    rename task_item to score;
    alter table score rename column task_item_idx to score_idx;
    alter table score rename column task_score to score;
    alter table score rename column task_item_info_idx to task_idx;

--   section_item : section_tasks
    rename section_item to section_tasks;
    alter table section_tasks rename column section_item_idx to section_tasks_idx;
    alter table section_tasks rename column task_item_info_idx to task_idx;

--    task_item_info : task
    rename task_item_info to task;
    alter table task rename column task_item_info_idx to task_idx;

--  class_default_task 삭제
    drop table CLASS_DEFAULT_TASK;

--    jpa 제약 삭제하고 다시 생성하는 작업!
-- score : section, student, task
-- sectionTask : section, task
-- task : class


--기존의 변경된 이름의 테이블 지우고
--drop table section_tasks;
--drop table score;
--drop table Task;

--시퀀스
--추가
    CREATE SEQUENCE "AUTH_CLASS_SEQ_NO"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
    CREATE SEQUENCE  "AUTH_STUDENT_SEQ_NO"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
    CREATE SEQUENCE  "CLASS_MEMBERS_SEQ_NO"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
    CREATE SEQUENCE  "SCHOOL_SEQ_NO"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
    CREATE SEQUENCE  "SEASON_SEQ_NO"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;

--   drop sequence AUTH_CLASS_SEQ_NO;
-- 시퀀스 넘버확인 번호 ?兮?
   SELECT LAST_NUMBER FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'AUTH_CLASS_SEQ_NO';
--   ALTER SEQUENCE AUTH_CLASS_SEQ_NO INCREMENT BY +37;
   select AUTH_CLASS_SEQ_NO.nextval from dual;


--시퀀스 이름 수정
   rename task_item_seq_no to score_seq_no;
   rename task_item_name_seq_no to task_seq_no;
   rename section_item_seq_no to section_tasks_seq_no;


--school
--학교명 입력
insert into school values(school_seq_no.nextval,null,'CSIS');

--season
--시즌명 입력 (idx,name,schoolidx)
insert into season values(season_seq_no.nextval,'2020 Fall Semester',1);
insert into season values(season_seq_no.nextval,'2021 Spring Semester',1);

--account
--모든 선생님 학교와 권한 설정
update account set school_idx = 1,authority = 0 ;
--권한이 0인 선생님 auto_save 0으로
update account set auto_save = 0 where authority =0;

--class
--클래스 전체를 시즌1로
update class set season_idx = 1 ;
update student set season_idx = 1;
commit;
--update auth_class set season_idx = 1;
--update auth_student set season_idx = 1;

--auth_class
-- 클래스 데이터를 보면서 생성
-- 클래스 아이디는 여러개중 하나만 살릴 것임
-- delete는 현재는 안된다! 클래스 무결성 해결하고 와서 지우자
-- id, 클래스id (대표 하나), 유저id, 시즌id (1)

    --CB
    insert into auth_class values(auth_class_seq_no.nextval,44,54,1);
    insert into auth_class values(auth_class_seq_no.nextval,44,55,1);
    insert into auth_class values(auth_class_seq_no.nextval,44,21,1);
    insert into auth_class values(auth_class_seq_no.nextval,44,58,1);
    insert into auth_class values(auth_class_seq_no.nextval,44,59,1);
    delete from class where class_idx in (65,56,61,72);
    --Character Building
    insert into auth_class values(auth_class_seq_no.nextval,46,62,1);
    insert into auth_class values(auth_class_seq_no.nextval,46,57,1);
    insert into auth_class values(auth_class_seq_no.nextval,46,53,1);
    insert into auth_class values(auth_class_seq_no.nextval,46,56,1);
          --insert into auth_class values(auth_class_seq_no.nextval,44,null,1); ????????????????
          delete from task where task_idx = 52;
          delete from class where class_idx = 55;
    delete from class where class_idx in (69,60,55,78);
    --Fine Arts
    insert into auth_class values(auth_class_seq_no.nextval,77,56,1);
    --History
    insert into auth_class values(auth_class_seq_no.nextval,76,56,1);
    --LA
    insert into auth_class values(auth_class_seq_no.nextval,66,55,1);
    insert into auth_class values(auth_class_seq_no.nextval,66,21,1);
    delete from class where class_idx in (85);
    --Language Arts
    insert into auth_class values(auth_class_seq_no.nextval,49,21,1);
    insert into auth_class values(auth_class_seq_no.nextval,49,62,1);
    insert into auth_class values(auth_class_seq_no.nextval,49,59,1);
    insert into auth_class values(auth_class_seq_no.nextval,49,57,1);
    insert into auth_class values(auth_class_seq_no.nextval,49,56,1);
    delete from class where class_idx in (73,70,79,59);
    --Math
    insert into auth_class values(auth_class_seq_no.nextval,57,54,1);
    insert into auth_class values(auth_class_seq_no.nextval,57,62,1);
    insert into auth_class values(auth_class_seq_no.nextval,57,55,1);
    insert into auth_class values(auth_class_seq_no.nextval,57,21,1);
    insert into auth_class values(auth_class_seq_no.nextval,57,57,1);
    insert into auth_class values(auth_class_seq_no.nextval,57,56,1);
    delete from class where class_idx in (83,71,80,62,75);
    --Math 2
    insert into auth_class values(auth_class_seq_no.nextval,51,59,1);
    --Math test
    insert into auth_class values(auth_class_seq_no.nextval,88,53,1);
    --Science
    insert into auth_class values(auth_class_seq_no.nextval,50,57,1);
    insert into auth_class values(auth_class_seq_no.nextval,50,56,1);
    insert into auth_class values(auth_class_seq_no.nextval,50,62,1);
    insert into auth_class values(auth_class_seq_no.nextval,50,59,1);
    insert into auth_class values(auth_class_seq_no.nextval,50,21,1);
    insert into auth_class values(auth_class_seq_no.nextval,50,55,1);
    delete from class where class_idx in (81,74,68,67,87);
    --클래스 1
    insert into auth_class values(auth_class_seq_no.nextval,41,22,1);
    --클래스 2
    insert into auth_class values(auth_class_seq_no.nextval,53,22,1);
    --클래스3
    insert into auth_class values(auth_class_seq_no.nextval,63,22,1);


--student
--auth_student
--class_members

--attendance

-----------auth_Class가 만들어져야 작업할 수 있다.
--section
--select * from auth_class where class_idx = 41 and user_idx = (select user_idx from class where class_idx = (select class_idx from section where section_idx = 1));
--update section s set auth_class_idx = (select

--task : task_item_info

-----------노 건들 ㅋ
--section_tasks : section_item

-----------auth_Class, class_Members가 만들어져야 작업할 수 있다.
--score : task_item
