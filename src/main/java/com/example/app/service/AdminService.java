package com.example.app.service;

import com.example.app.common.OrderByCode;
import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.dto.response.repository.studentGroup;
import com.example.app.model.dto.response.teacherAuthCountResponse;
import com.example.app.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.*;

@Service
public class AdminService {

    @Autowired
    ClassRepository classRepo;
    @Autowired
    SectionRepository sectionRepo;
    @Autowired
    ScoreRepository scoreRepo;
    @Autowired
    TaskRepository taskRepo;
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    SectionTasksRepository sectionTasksRepo;
    @Autowired
    AuthClassRepository authClassRepo;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    ClassMembersRepository classMembersRepo;
    @Autowired
    AuthStudentRepository authStudentRepo;
    @Autowired
    AttendanceRepository attendanceRepo;
    @Autowired
    AccountRepository accountRepo;
    @Autowired
    StudentService studentService;

    private static Logger logger = LoggerFactory.getLogger(AdminService.class);


    //0.현재 계정의 시즌 목록을 조회하는 기능
    public List<Season> findSeasonList(HttpSession session) {
        Account account = (Account) session.getAttribute("Account");
        return seasonRepo.findSeasonBySchoolOrderBySeasonIdx(account.getSchool());
    }

    //1. 시즌관리 - 클래스 Grade 수정
    public Class updateClassGrade(Long ClassIdx, String Grade) {
        Class _class = classRepo.findById(ClassIdx).get();
        _class.setClassGrade(Grade);
        return classRepo.save(_class);
    }

    @Transactional
    @Modifying
    @ResponseBody
    //0.클래스를 삭제하는 기능
    public void delClass(Long[] classIdxList) {

//       authClass -> Section, SectionTasks,Task,Score

        for (Long ClassIdx : classIdxList) {
            System.out.println("delClass 시작");

            //authClass찾기
            List<AuthClass> authClassList = authClassRepo.findAuthClassBy_class_ClassIdx(ClassIdx);
            for (AuthClass authClass : authClassList) {

                Long authClassIdx = authClass.getAuthClassIdx();

                //점수 삭제
                scoreRepo.DelScoreByAuthClassIdx(authClassIdx);
                System.out.println("과제항목데이터삭제");

                //섹션_과제 삭제
                sectionTasksRepo.DelSectionTasksByAuthClassIdx(authClassIdx);
                System.out.println("섹션항목 삭제");

                //섹션 삭제
                sectionRepo.DelSectionByAuthClassIdx(authClassIdx);
                System.out.println("섹션 삭제");

                //과제 항목 삭제
                taskRepo.DelTaskByAuthClassIdx(authClassIdx);
                System.out.println("과제삭제");

                //클래스 멤버 삭제
                classMembersRepo.DelClassMembersByAuthClassIdx(authClassIdx);

                //AuthClass삭제
                authClassRepo.DelAuthClassByAuthClassIdx(authClassIdx);
                System.out.println("AuthClass 삭제");

            }

            //클래스 삭제
            classRepo.deleteById(ClassIdx);
            System.out.println("클래스 삭제");

            System.out.println("서비스 delClass 끝");
        }
    }

    @Transactional
    @Modifying
    @ResponseBody
    //0.학생을 삭제하는 기능
    public void delStudent(Long[] studentIdxList) {

//       authStudent ->

        for (Long studentIdx : studentIdxList) {
            System.out.println("delStudent 시작");

            //authStudent찾기
            List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentByStudent_StudentIdx(studentIdx);
            for (AuthStudent authStudent : authStudentList) {

                Long authStudentIdx = authStudent.getAuthStudentIdx();

                //출석 삭제
                attendanceRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                System.out.println("출석 삭제");

                //과제 점수 삭제


                scoreRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                System.out.println("점수삭제");

                //클래스 멤버 삭제
                classMembersRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                System.out.println("클래스_맴버 삭제");

                //AuthStudent삭제
                authStudentRepo.deleteById(authStudentIdx);
                System.out.println("AuthStudent 삭제");

            }

            //클래스 삭제
            studentRepo.deleteById(studentIdx);
            System.out.println("Student 삭제");

            System.out.println("서비스 delStudent 끝");
        }
    }

    @Transactional
    @Modifying
    @ResponseBody
    //0. Auth학생 삭제 삭제하는 기능
    public void deleteAuthStudent(Long[] authStudentIdxList) {
        for (Long authStudentIdx : authStudentIdxList) {
            //출석 삭제
            attendanceRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
            System.out.println("출석 삭제");

            //과제 점수 삭제
            scoreRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
            System.out.println("점수삭제");

            //클래스 멤버 삭제
            classMembersRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
            System.out.println("클래스_맴버 삭제");
            //AuthStudent삭제
            authStudentRepo.deleteById(authStudentIdx);
            System.out.println("AuthStudent 삭제");
        }
    }

    @Transactional
    @Modifying
    @ResponseBody
    //0. Auth학생 삭제 삭제하는 기능
    public void deleteAuthClass(String[] authClassList,Long userIdx, Long curSeasonIdx) {

        for (String className : authClassList) {

            //1. className의 학생 목록 가져오기
            List<AuthStudent> studentList = authStudentRepo.findByAuthStudentByClassNameAndSeasonAndUserIdx(className,curSeasonIdx,userIdx);

            for (AuthStudent authStudent : studentList) {

                Long authStudentIdx = authStudent.getAuthStudentIdx();
                    //출석 삭제
                    attendanceRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                    System.out.println("출석 삭제");

                    //과제 점수 삭제
                    scoreRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                    System.out.println("점수삭제");

                    //클래스 멤버 삭제
                    classMembersRepo.deleteByAuthStudent_AuthStudentIdx(authStudentIdx);
                    System.out.println("클래스_맴버 삭제");

                    //AuthStudent삭제
                    authStudentRepo.deleteById(authStudentIdx);
                    System.out.println("AuthStudent 삭제");
            }

        }
    }

    @Transactional
    @Modifying
    @ResponseBody
    //0. Auth클래스 삭제 삭제하는 기능
    public void deleteAuthCourse(Long[] classIdxList) {
        for (Long classIdx : classIdxList) {

            //점수 삭제
            scoreRepo.DelScoreByAuthClassIdx(classIdx);
            System.out.println("과제항목데이터삭제");

            //섹션_과제 삭제
            sectionTasksRepo.DelSectionTasksByAuthClassIdx(classIdx);
            System.out.println("섹션항목 삭제");

            //섹션 삭제
            sectionRepo.DelSectionByAuthClassIdx(classIdx);
            System.out.println("섹션 삭제");

            //과제 항목 삭제
            taskRepo.DelTaskByAuthClassIdx(classIdx);
            System.out.println("과제삭제");

            //클래스 멤버 삭제
            classMembersRepo.DelClassMembersByAuthClassIdx(classIdx);

            //AuthClass삭제
            authClassRepo.DelAuthClassByAuthClassIdx(classIdx);
            System.out.println("AuthClass 삭제");

        }
    }

    @ResponseBody
    //0.선생님을 찾는 기능
    public List<teacherAuthCountResponse> findTeacherList(HttpSession session, Long curSeasonIdx, Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "userIdx");
        if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "userName");
        }

        Account adminAccount = (Account) session.getAttribute("Account");
        List<Account> accountList = accountRepo.findAccountBySchool(adminAccount.getSchool(), sort);
        List<teacherAuthCountResponse> authCountList = new ArrayList<>();
        for (Account account : accountList) {
            teacherAuthCountResponse authCountResponse = new teacherAuthCountResponse();
            authCountResponse.setAuthStudentCount(authStudentRepo.countAllByAccountAndSeason_SeasonIdx(account, curSeasonIdx));
            authCountResponse.setAuthClassCount(authClassRepo.countAllByAccountAndSeason_SeasonIdx(account, curSeasonIdx));
            authCountResponse.setAccount(account);
            authCountList.add(authCountResponse);
        }
        ;

        return authCountList;

    }

    @ResponseBody
    //0.선생님을 찾는 기능
    public List<AuthStudent> findAuthStudentList(Long userIdx, Long curSeasonIdx, Long orderBy, HttpSession session) {
        Sort sort = Sort.by(Sort.Direction.ASC, "AuthStudentIdx");
        if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "StudentStudentGrade");
        } else if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "StudentStudentName");
        }

        Account account = accountRepo.findById(userIdx).get();

        return authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount(curSeasonIdx, account, sort);

    }

    @ResponseBody
    //0.Auth 학생을 찾는 기능
    public List<AuthClass> findAuthClassList(Long userIdx, Long curSeasonIdx, Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "AuthClassIdx");
        if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "_classClassName");
        } else if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "_classClassGrade");
        }
        Account account = accountRepo.findById(userIdx).get();
        return authClassRepo.findAuthClassBySeason_SeasonIdxAndAccount(curSeasonIdx, account, sort);

    }

    @Transactional
    @Modifying
    //9. 선생님 관리 - Auth학생 생성
    public List<AuthStudent> createAuthStudent(Long[] studentIdxList, Long userIdx, Long curSeasonIdx) {

        Account account = accountRepo.findById(userIdx).get();
        Season season = seasonRepo.findById(curSeasonIdx).get();

        for (Long studentIdx : studentIdxList) {
            AuthStudent authStudent = new AuthStudent();
            authStudent.setAccount(account);
            authStudent.setSeason(season);

            authStudent.setStudent(studentRepo.findById(studentIdx).get());
            authStudentRepo.save(authStudent);
        }

        return null;

    }

    @Transactional
    @Modifying
    //9. 선생님 관리 - Auth클래스 생성
    public List<AuthStudent> createAuthClass(String[] classList, Long userIdx, Long curSeasonIdx) {

        Account account = accountRepo.findById(userIdx).get();
        Season season = seasonRepo.findById(curSeasonIdx).get();

        for (String className : classList) {

//            AuthStudent authStudent = new AuthStudent();
//            authStudent.setAccount(account);
//            authStudent.setSeason(season);

//            authStudent.setStudent(studentRepo.findById(className).get());
//            authStudentRepo.save(authStudent);

            //1. className의 학생 목록 가져오기
            List<Student> studentList = studentRepo.findByStudentStudentGroupAndSeasonSeasonIdx(className,curSeasonIdx);

            //2. authStudent에 확인후 없으면 삽입
            for(Student student : studentList){
//              검색결과가 없으면

                if(authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount_UserIdxAndStudent_StudentIdx(curSeasonIdx,userIdx,student.getStudentIdx())== null){

                    AuthStudent authStudent = new AuthStudent();
                    authStudent.setAccount(account);
                    authStudent.setSeason(season);
                    authStudent.setStudent(student);
                    authStudent.setAuthStudentGroup(className);

                    authStudentRepo.save(authStudent);
                }
            }

        }
        return null;
    }


    @Transactional
    @Modifying
    //9. 선생님 관리 - Auth클래스생성
    public List<AuthStudent> createAuthCourse(Long[] classIdxList, Long userIdx, Long curSeasonIdx) {

        Account account = accountRepo.findById(userIdx).get();
        Season season = seasonRepo.findById(curSeasonIdx).get();

        List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccountOrderByAuthStudentIdx(curSeasonIdx, account);

        for (Long classIdx : classIdxList) {
            AuthClass authClass = new AuthClass();
            authClass.setAccount(account);
            authClass.setSeason(season);
            authClass.set_class(classRepo.findById(classIdx).get());
            authClass = authClassRepo.save(authClass);

            //클래스 맴버 배치
            for (AuthStudent authStudent : authStudentList) {
                System.out.println(authStudent);
                ClassMembers classMembers = new ClassMembers();
                classMembers.setAuthStudent(authStudent);
                classMembers.setAuthClass(authClass);
                classMembersRepo.save(classMembers);
            }
        }
        return null;
    }

    //2. 관리자 계정의 전체 학생을 조회하는 기능
    public List<Student> findStudentList_WithoutAuth(Long userIdx, Long curSeasonIdx, Long orderBy, HttpSession session) {

        Sort sort = Sort.by(Sort.Direction.ASC, "studentIdx");
        if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "studentGrade");
        } else if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "studentName");
        }

        List<Student> student = studentRepo.findStudentByAccountWithoutAuthStudent(curSeasonIdx, userIdx, sort);
        return student;
    }

    //9. 선생님 관리 - 현재 선생님의 authClass (group)를 제외한 전체 Class(group) 목록 출력
    public List<studentGroup> findClassList_WithoutAuth(Long userIdx, Long curSeasonIdx, HttpSession session) {
        List<studentGroup> _class = studentRepo.findClassList_WithoutAuth(curSeasonIdx);
        return _class;
    }

    //9. 선생님 관리 - 현재 선생님의 authClass(group) 목록 출력
    public List<studentGroup> findAuthClassList_Group(Long userIdx, Long curSeasonIdx, HttpSession session) {
        List<studentGroup> _class = studentRepo.findAuthClassList_Group(curSeasonIdx, userIdx);
        return _class;
    }

    //9. 선생님 관리 - 현재 선생님의 authStudent와 authClass Count를 업데이트
    public teacherAuthCountResponse updateCount(Long userIdx, Long curSeasonIdx) {
        teacherAuthCountResponse authCountResponse = new teacherAuthCountResponse();
        Account account = accountRepo.findById(userIdx).get();
        authCountResponse.setAuthStudentCount(authStudentRepo.countAllByAccountAndSeason_SeasonIdx(account, curSeasonIdx));
        authCountResponse.setAuthClassCount(authClassRepo.countAllByAccountAndSeason_SeasonIdx(account, curSeasonIdx));
        return authCountResponse;
    }

    @ResponseBody
    //9. 선생님 관리 - classMembers에 등록된 학생을 뺀 Auth 학생 목록
    public List<AuthStudent> findAuthStudentList2(Long authClassIdx, Long userIdx, Long curSeasonIdx, Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "authStudentIdx");
        if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "student.studentName");
        } else if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "student.studentGrade");
        }

        return authStudentRepo.findAuthStudentByAuthClassIdxWithoutClassMembers(userIdx, curSeasonIdx, authClassIdx, sort);

    }

    //2. 관리자 계정의 전체 학생을 조회하는 기능
    public List<ClassMembers> findClassMembers(Long authClassIdx, Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "classMembersIdx");
        if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "authStudent.student.studentGrade");
        } else if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "authStudent.student.studentName");
        }

        List<ClassMembers> classMembersList = classMembersRepo.findByAuthClass_AuthClassIdx(authClassIdx, sort);
        return classMembersList;
    }

    @Transactional
    @Modifying
    //9. 선생님 관리 - classMembers 학생 생성
    public List<ClassMembers> createClassMembers(Long[] studentIdxList, Long authClassIdx) {

        AuthClass authClass = authClassRepo.findById(authClassIdx).get();

        for (Long studentIdx : studentIdxList) {
            ClassMembers classMembers = new ClassMembers();
            classMembers.setAuthClass(authClass);
            classMembers.setAuthStudent(authStudentRepo.findById(studentIdx).get());
            classMembersRepo.save(classMembers);
        }

        return null;

    }

    @Transactional
    @Modifying
    //9. 선생님 관리 - classMembers 학생 삭제
    public List<ClassMembers> deleteClassMembers(Long[] classMembersList) {

        for (Long classMembersIdx : classMembersList) {
            //과제 점수 삭제
            scoreRepo.deleteByClassMembers(classMembersIdx);
            System.out.println("점수삭제");
            //클래스 멤버 삭제
            classMembersRepo.deleteById(classMembersIdx);
            System.out.println("클래스_맴버 삭제");
        }

        return null;

    }

    //10. authClassIdx로 authClass찾기
    public AuthClass findAuthClassByAuthClassId(Long authClassIdx) {
        return authClassRepo.findById(authClassIdx).get();
    }


    //test
    @Transactional
    @Modifying
    public void test() {

        /*//////////////전 시즌의 class와 student 복사
        Sort sort = Sort.by(Sort.Direction.ASC,"classIdx");
        List<Class> classList = classRepo.findClassBySeason_SeasonIdx(1L,sort);
        Season season = seasonRepo.findById(2L).get();
        for(Class _class : classList){
            Class newClass = new Class();
            newClass.setClassGrade(_class.getClassGrade());
            newClass.setClassName(_class.getClassName());
            newClass.setAccount(_class.getAccount());
            newClass.setSeason(season);
            classRepo.save(newClass);
        }
        sort = Sort.by(Sort.Direction.ASC,"studentIdx");
        List<Student> studentList = studentRepo.findStudentBySeason_SeasonIdx(1L,sort);
        for(Student student : studentList){
            Student newStudent = new Student();
            newStudent.setStudentGender(student.getStudentGender());
            newStudent.setStudentGrade(student.getStudentGrade());
            newStudent.setAccount(student.getAccount());
            newStudent.setStudentName(student.getStudentName());
            newStudent.setSeason(season);
            studentRepo.save(newStudent);
        }

*/


/*

//        score에 sectionIdx랑 taskIdx지워야할듯 ;

//        1.
//       클래스를 이름순으로 가져와
        List<Class> classList = classRepo.findAll();
        Class preClass = new Class();
        preClass.setClassName("");
        int flag = 0;

        for (Class _class : classList) {

            logger.info("현재 클래스 : "+_class);

            //현재 classIdx와 userIdx을 가지고 auth_Class에 저장
            AuthClass authClass = new AuthClass();

//        만약 다음클래스가 이름이 똑같다면 기존에 사용하고있는 id를 입력
//        다른 이름이라면 계속진행

            if (preClass.getClassName().equals(_class.getClassName())) {
                logger.info("******************************************************************");
                logger.info("클래스명 중복 : "+_class.getClassIdx() + " : "+preClass.getClassName());
                logger.info("******************************************************************");

                authClass.set_class(preClass);
//
//              task,section 인수인계
                flag=1;

//              현재 클래스는 삭제 : 무결성 ;ㅅ;
//                classRepo.delete(_class);
            } else {
                authClass.set_class(_class);
//              클래스명 비교를 위해 현재클래스명 저장
                preClass = _class;
            }

            authClass.setAccount(_class.getAccount());
            authClass.setSeason(_class.getSeason());

            AuthClass rsAuthClass = authClassRepo.save(authClass);

            logger.info("저장된 authClass : " + authClass);

//       저장된 authClass정보를 가지고
//       현재 classIdx의 section을 찾아 입력해준다.

            Class inputclass = rsAuthClass.get_class();
            if(flag==1) {
                inputclass = _class;
            }

            List<Section> sectionList = sectionRepo.find(inputclass);
            for (Section section : sectionList) {
                section.setAuthClass(rsAuthClass);
                sectionRepo.save(section);

                logger.info("저장된 section : " + section);
            }
//       현재 classIdx의 Task를 찾아 입력해준다.


            List<Task> taskList = taskRepo.find(inputclass);
            for (Task task : taskList) {
                task.setAuthClass(rsAuthClass);
                taskRepo.save(task);

                logger.info("저장된 task : " + task);
            }

            flag=0;
        }
*/


/*

//       2.
//        student 걍 넣으면 될듯 ㅋ
        List<Student> studentList = studentRepo.findAll();

        for (Student student : studentList) {
            AuthStudent authStudent = new AuthStudent();

//      현재 studentidx와 useridx를 가지고 authStudent에 저장
            authStudent.setStudent(student);
            authStudent.setAccount(student.getAccount());
            authStudent.setSeason(student.getSeason());

            AuthStudent rsAuthStudent = authStudentRepo.save(authStudent);

//        저장된 authStudent정보를 가지고
//        현재 studentIdx의 attendance를 찾아 입력해준다.
            List<Attendance> attendanceList = attendanceRepo.find(rsAuthStudent.getStudent());
            for (Attendance attendance : attendanceList) {
                attendance.setAuthStudent(rsAuthStudent);
                attendanceRepo.save(attendance);
            }

        }
*/



/*

//      3. 1,2단계가 성공하면 진행할 것
//      class Members
//      관리자가 아닌 모든 유저정보를 들고와
        List<Account> accountList = accountRepo.findAll();

        for (Account account : accountList) {
//            logger.info("현재 계정 : " + account);
//      선생님의 모든 authClass를 들고온다.
            List<AuthClass> authClassList = authClassRepo.findAuthClassByAccount(account);
//      선생님의 모든 authStudent를 가져온다.
            List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentByAccount(account);

//       auth_class와 auth_Student를 가지고 classMembers에 입력해준다.
            for (AuthClass authClass : authClassList) {
//                logger.info("현재 authClass : " + authClass.getAuthClassIdx() + "  : " + authClass.get_class().getClassName());
                for (AuthStudent authStudent : authStudentList) {
//                    logger.info("현재 authStudent : " + authStudent.getAuthStudentIdx() + " : " + authStudent.getStudent().getStudentName());
                    ClassMembers classMembers = new ClassMembers();
                    classMembers.setAuthClass(authClass);
                    classMembers.setAuthStudent(authStudent);
                    */
/*ClassMembers rsClassMembers = *//*
classMembersRepo.save(classMembers);
//                    logger.info("저장된 ClassMembers : " + rsClassMembers);
                }
            }
        }
//       입력한 classMembers정보를 가지고
//        현재 score에 student의 authstudentIdx를 찾아 입력해준다.
//        scoreRepo.findByStudent(rsClassMembers,rsClassMembers.getAuthStudent().getStudent());
*/



/*
//        4.저장된 classMembers를 score에 대입
        List<Account> accountList = accountRepo.findAll();

        for (Account account : accountList) {
//            List<ClassMembers> classMembersList = classMembersRepo.findAll();
            List<AuthClass> authClassList = authClassRepo.findAuthClassByAccount(account);
            List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentByAccount(account);
            for (AuthClass authClass : authClassList) {
                for (AuthStudent authStudent : authStudentList) {
                    ClassMembers rsClassMembers = classMembersRepo.findAll2(authStudent,authClass);
                    scoreRepo.findByStudent(rsClassMembers,rsClassMembers.getAuthStudent().getStudent(),rsClassMembers.getAuthClass());
                }
            }
        }*/



    }
}


//        5.
//        authCLass와 authStudent에 현재 시즌을 전체입력해준다.

