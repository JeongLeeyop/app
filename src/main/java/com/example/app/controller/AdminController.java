package com.example.app.controller;

import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.dto.request.studentRequest;
import com.example.app.model.dto.response.repository.studentGroup;
import com.example.app.model.dto.response.teacherAuthCountResponse;
import com.example.app.service.AdminService;
import com.example.app.service.ClassService;
import com.example.app.service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    ClassService classService;
    @Autowired
    AdminService adminService;
    @Autowired
    SettingService settingService;

    //1. 관리자 화면
    @RequestMapping("")
    public ModelAndView admin() {
//        log.debug("admin");
        ModelAndView view = new ModelAndView("/admin/admin");
        return view;
    }

    //2. 관리자 - 시즌 관리
    @RequestMapping("/season_setting")
    public ModelAndView season_setting() {
//        log.debug("admin/season_setting");
        ModelAndView view = new ModelAndView("/admin/season_setting");
        return view;
    }

    //3. 관리자 - 선생님 관리
    @RequestMapping("/teacher_setting")
    public ModelAndView teacher_setting() {
//        log.debug("admin/teacher_setting");
        ModelAndView view = new ModelAndView("/admin/teacher_setting");
        return view;
    }

    //4. 시즌관리 - 클래스 Grade 수정
    @ResponseBody
    @RequestMapping("/updateClassGrade")
    public Class updateClassGrade(Long ClassIdx, String Grade) throws Exception {
        Class _class = adminService.updateClassGrade(ClassIdx,Grade);
        if(_class!=null) {
//            System.out.println(_class);
            return _class;
        } else {
            throw new Exception();
        }
    }

    //5. 시즌관리 - 클래스 Grade 수정
    @ResponseBody
    @RequestMapping("/updateStudentGender")
    public Student updateStudentGender(studentRequest studentReq,HttpSession session) throws Exception {
        Student student = settingService.updateStudent(studentReq,null,1,session);
        if(student!=null) {
//            System.out.println(student);
            return student;
        } else {
            throw new Exception();
        }
    }

    //6. 시즌관리 - 클래스 Grade 수정
    @ResponseBody
    @RequestMapping("/updateStudentGrade")
    public Student updateStudentGrade(studentRequest studentReq,HttpSession session) throws Exception {
        Student student = settingService.updateStudent(studentReq,null,2,session);
        if(student!=null) {
//            System.out.println(student);
            return student;
        } else {
            throw new Exception();
        }
    }

    //7. 시즌관리 - 새 클래스를 삭제하는 기능
    @RequestMapping("delClass")
    @ResponseBody
    public void delClass(Long[] classIdxList) throws Exception{

        try {
            adminService.delClass(classIdxList);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    //8. 시즌관리 - 학생을 삭제하는 기능
    @RequestMapping("delStudent")
    @ResponseBody
    public void delStudent(Long[] studentIdxList) throws Exception{
        try {
            adminService.delStudent(studentIdxList);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    //8. 선생님관리 - 선생님 전체 조회
    @RequestMapping("findTeacherList")
    @ResponseBody
    public List<teacherAuthCountResponse> findTeacherList(HttpSession session, Long curSeasonIdx, Long orderBy) throws Exception{
        try {
            return adminService.findTeacherList(session,curSeasonIdx,orderBy);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    //9. 선생님 관리 - 선생님 학생 조회
    @RequestMapping("findTeacherAuthStudentList")
    @ResponseBody
    public List<AuthStudent> findAuthStudent(Long userIdx,Long curSeasonIdx, Long orderBy, HttpSession session)  {
        List<AuthStudent> result = adminService.findAuthStudentList(userIdx,curSeasonIdx,orderBy,session);
        return result;
    }

    //9. 선생님 관리 - Auth학생 생성
    @RequestMapping("createAuthStudent")
    @ResponseBody
    public List<AuthStudent> createAuthStudent(Long[] studentIdxList,Long userIdx, Long curSeasonIdx)  {
        adminService.createAuthStudent(studentIdxList,userIdx,curSeasonIdx);
        return null;
    }

    //9. 선생님 관리 - Auth Class 생성
    @RequestMapping("createAuthClass")
    @ResponseBody
    public List<AuthStudent> createAuthClass(String[] classList,Long userIdx, Long curSeasonIdx)  {
        adminService.createAuthClass(classList,userIdx,curSeasonIdx);
        return null;
    }

    //0.Auth Class을 찾는 기능
    @RequestMapping("findAuthClass")
    @ResponseBody
    public AuthClass findAuthClass(Long authClassIdx) {
        AuthClass result = adminService.findAuthClassByAuthClassId(authClassIdx);
        //에러제어 필요
        return result;
    }

    //0.Auth Class을 찾는 기능
    @RequestMapping("findAuthClassList")
    @ResponseBody
    public List<AuthClass> findAuthClassList(Long userIdx, Long curSeasonIdx, Long orderBy) {
        List<AuthClass> result = adminService.findAuthClassList(userIdx,curSeasonIdx,orderBy);
        //에러제어 필요
        return result;
    }

    //0.Auth Class을 찾는 기능
    @RequestMapping("findAuthClassList2")
    @ResponseBody
    public List<AuthClass> findAuthClassList2(HttpSession session, Long curSeasonIdx, Long orderBy) {
        Account account = (Account)session.getAttribute("Account");
        List<AuthClass> result = adminService.findAuthClassList(account.getUserIdx(),curSeasonIdx,orderBy);
        //에러제어 필요
        return result;
    }

    //9. 선생님 관리 - Auth학생 삭제
    @RequestMapping("deleteAuthStudent")
    @ResponseBody
    public List<AuthStudent> deleteAuthStudent(Long[] authStudentIdxList)  {
        adminService.deleteAuthStudent(authStudentIdxList);
        return null;
    }

    //9. 선생님 관리 - Auth학생 삭제
    @RequestMapping("deleteAuthClass")
    @ResponseBody
    public List<AuthStudent> deleteAuthClass(String[] authClassList,Long userIdx, Long curSeasonIdx)  {
        adminService.deleteAuthClass(authClassList,userIdx,curSeasonIdx);
        return null;
    }

    //9. 선생님 관리 - Auth클래스 삭제
    @RequestMapping("deleteAuthCourse")
    @ResponseBody
    public List<AuthStudent> deleteAuthCourse(Long[] classIdxList)  {
        adminService.deleteAuthCourse(classIdxList);
        return null;
    }

    //9. 선생님 관리 - Auth클래스생성
    @RequestMapping("createAuthCourse")
    @ResponseBody
    public List<AuthStudent> createAuthCourse(Long[] classIdxList, Long userIdx, Long curSeasonIdx)  {
        adminService.createAuthCourse(classIdxList,userIdx,curSeasonIdx);
        return null;
    }

    //9. 선생님 관리 - 현재 선생님의 authStudent를 제외한 전체 Student 목록 출력
    @RequestMapping("findStudentList_WithoutAuth")
    @ResponseBody
    public List<Student> findStudentList_WithoutAuth(Long userIdx,Long curSeasonIdx, Long orderBy ,HttpSession session) {
        return adminService.findStudentList_WithoutAuth(userIdx,curSeasonIdx,orderBy,session);
    }

    //9. 선생님 관리 - 현재 선생님의 authClass (group)를 제외한 전체 Class(group) 목록 출력
    @RequestMapping("findClassList_WithoutAuth")
    @ResponseBody
    public List<studentGroup> findClassList_WithoutAuth(Long userIdx, Long curSeasonIdx , HttpSession session)  {
        return adminService.findClassList_WithoutAuth(userIdx,curSeasonIdx,session);
    }

    //9. 선생님 관리 - 현재 선생님의 authClass(group) 목록 출력
    @RequestMapping("findAuthClassList_Group")
    @ResponseBody
    public List<studentGroup> findAuthClassList_Group(Long userIdx, Long curSeasonIdx , HttpSession session)  {
        return adminService.findAuthClassList_Group(userIdx,curSeasonIdx,session);
    }

    //9. 선생님 관리 - 현재 선생님의 authStudent와 authClass Count를 업데이트
    @RequestMapping("updateCount")
    @ResponseBody
    public teacherAuthCountResponse updateCount(Long userIdx,Long curSeasonIdx) {
        return adminService.updateCount(userIdx,curSeasonIdx);
    }

    //9. 선생님 관리 - classMembers에 등록된 학생을 뺀 Auth 학생 목록
    @RequestMapping("findTeacherAuthStudentList2")
    @ResponseBody
    public List<AuthStudent> findTeacherAuthStudentList2(Long authClassIdx,Long userIdx,Long curSeasonIdx,Long orderBy)  {
        List<AuthStudent> result = adminService.findAuthStudentList2(authClassIdx,userIdx,curSeasonIdx,orderBy);
        return result;
    }

    //9. 선생님 관리 - 현재 AuthClass의 classMembers 목록 출력
    @RequestMapping("findClassMembers")
    @ResponseBody
    public List<ClassMembers> findClassMembers(Long authClassIdx, Long orderBy) {
        return adminService.findClassMembers(authClassIdx,orderBy);
    }

    //9. 선생님 관리 - classMembers 학생 생성
    @RequestMapping("createClassMembers")
    @ResponseBody
    public List<ClassMembers> createClassMembers(Long[] studentIdxList,Long authClassIdx)  {
        //형변환
        adminService.createClassMembers(studentIdxList,authClassIdx);
        return null;
    }

    //9. 선생님 관리 - classMembers 학생 삭제
    @RequestMapping("deleteClassMembers")
    @ResponseBody
    public List<ClassMembers> deleteClassMembers(Long[] classMembersList)  {
        //형변환
        adminService.deleteClassMembers(classMembersList);
        return null;
    }

}
