package com.example.app.controller;

import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.studentChartResponse;
import com.example.app.model.dto.response.totalGradeResponse;
import com.example.app.service.AdminService;
import com.example.app.service.AttendanceService;
import com.example.app.service.SettingService;
import com.example.app.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class StudentController {

    @Autowired
    StudentService studentService;
    @Autowired
    AdminService adminService;

    //0. 전체 학생의 이름을 조회하는 기능
    @RequestMapping("findStudentList")
    @ResponseBody
    public List<Student> findStudentList(Long curSeasonIdx, Long orderBy ,HttpSession session) {
        return studentService.findStudentList(curSeasonIdx,orderBy,session);
    }

    //1. 전체 학생의 요약정보를 조회하는 기능
    @RequestMapping("findStudentSummary")
    @ResponseBody
    public Map<String,Object> findStudentSummary(Long curSeasonIdx,HttpSession session) {
        return studentService.findStudentSummary(curSeasonIdx,session);
    }

    //1. 특정학생의 상세정보를 조회하는 기능
    @RequestMapping("findStudentDetail")
    public ModelAndView findStudentDetail(HttpServletRequest req) {
        return null;
    }

    //클래스(학생그룹) 목록을 조회하는 기능
    @RequestMapping("/findStudentGroupList")
    @ResponseBody
    public List<String> findStudentGroupList(Long curSeasonIdx) {
        return studentService.findStudentGroupList(curSeasonIdx);
    }

    //학생 클래스(그룹)을 수정하는 기능
    @RequestMapping("/updateStudentGroup")
    @ResponseBody
    public void updateStudentGroup(Long studentIdx, String studentGroup) {
        return studentService.updateStudentGroup(studentIdx,studentGroup);
    }

    //TEST
    @Transactional
    @Modifying
    @RequestMapping("go")
    public String test(HttpServletResponse response) throws Exception{
        adminService.test();
        PrintWriter out = response.getWriter();
        out.println("<script>alert('test() 성공'); location.href='login';</script>");
        out.flush();
        return null;
    }
}



