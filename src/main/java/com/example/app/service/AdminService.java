package com.example.app.service;

import com.example.app.common.OrderByCode;
import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.dto.response.teacherAuthCountResponse;
import com.example.app.repository.*;
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

                Long authClassIdx = authStudent.getAuthStudentIdx();

                //출석 삭제
                attendanceRepo.deleteByAuthStudent_AuthStudentIdx(authClassIdx);
                System.out.println("출석 삭제");

                //과제 점수 삭제
                scoreRepo.deleteByAuthStudent_AuthStudentIdx(authClassIdx);
                System.out.println("점수삭제");

                //클래스 멤버 삭제
                classMembersRepo.deleteByAuthStudent_AuthStudentIdx(authClassIdx);
                System.out.println("클래스_맴버 삭제");

                //AuthStudent삭제
                authStudentRepo.deleteById(authClassIdx);
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
    //0. Auth클래스 삭제 삭제하는 기능
    public void deleteAuthClass(Long[] classIdxList) {
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
        }
        else if (orderBy == OrderByCode.ByName.getValue()) {
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
    //9. 선생님 관리 - Auth클래스생성
    public List<AuthStudent> createAuthClass(Long[] classIdxList, Long userIdx, Long curSeasonIdx) {

        Account account = accountRepo.findById(userIdx).get();
        Season season = seasonRepo.findById(curSeasonIdx).get();

        List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccountOrderByAuthStudentIdx(curSeasonIdx,account);

        for (Long classIdx : classIdxList) {
            AuthClass authClass = new AuthClass();
            authClass.setAccount(account);
            authClass.setSeason(season);
            authClass.set_class(classRepo.findById(classIdx).get());
            authClass = authClassRepo.save(authClass);

            //클래스 맴버 배치
            for(AuthStudent authStudent : authStudentList) {
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
    public List<AuthStudent> findAuthStudentList2(Long authClassIdx,Long userIdx,Long curSeasonIdx,Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "authStudentIdx");
        if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "student.studentName");
        } else if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "student.studentGrade");
        }

        return authStudentRepo.findAuthStudentByAuthClassIdxWithoutClassMembers(userIdx,curSeasonIdx,authClassIdx,sort);

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
            scoreRepo.deleteByAuthStudent_AuthStudentIdx(classMembersIdx);
            System.out.println("점수삭제");
            //클래스 멤버 삭제
            classMembersRepo.deleteById(classMembersIdx);
            System.out.println("클래스_맴버 삭제");
        }

        return null;

    }

    //10. authClassIdx로 authClass찾기
    public AuthClass findAuthClassByAuthClassId(Long authClassIdx){
        return authClassRepo.findById(authClassIdx).get();
    }

}