package com.example.app.controller;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Class;
import com.example.app.service.AdminService;
import com.example.app.service.AttendanceService;
import com.example.app.service.ClassService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
public class MainViewController {

    @Autowired
    ClassService classService;
    @Autowired
    AdminService adminService;
    @Autowired
    AttendanceService attendanceService;

    //1. 로그인 화면
    @RequestMapping("/login")
    public ModelAndView login( Model model) {
//        log.debug("login");
        ModelAndView view = new ModelAndView("login");
        return view;
    }

    //1. 로그인 화면
    @RequestMapping("/")
    public ModelAndView login2( Model model) {
//        log.debug("login");
        ModelAndView view = new ModelAndView("login");
        return view;
    }

    //2. 회원 가입 화면
    @RequestMapping("/register")
    public ModelAndView register(HttpServletRequest req) {
        String email = req.getParameter("username");
//        log.debug("register");
        ModelAndView view = new ModelAndView("register");
        return view;
    }

    //4. 출석 화면
    @RequestMapping("/attendance")
    public ModelAndView attendance() {
//        log.debug("attendance");
        ModelAndView view = new ModelAndView("attendance");
        return view;
    }

    //5. 클래스 화면
    @RequestMapping(value="/attendance2",method=RequestMethod.POST)
    public ModelAndView attendance2(String authStudentGroup) {
        ModelAndView view = new ModelAndView("attendance");
        view.addObject("authStudentGroup",authStudentGroup);
        return view;
    }

    //4. 출석 화면
    @RequestMapping("/attendanceInit")
    public ModelAndView attendanceInit(HttpSession session) {
//        log.debug("attendance");
        Account account = (Account) session.getAttribute("Account");
        Long curSeason = attendanceService.SeasonInit(account);
        List<String> str = attendanceService.findAuthStudentGroup(account,curSeason);
        ModelAndView view = new ModelAndView("attendance");
        if(!str.isEmpty()) {
             view.addObject("authStudentGroup", str.get(0));
         }
        return view;
    }

    //3. 학생 정보 화면
    @RequestMapping("/student")
    public ModelAndView student() {
//        log.debug("index");
        ModelAndView view = new ModelAndView("student");
        return view;
    }

    //3. 학생 정보 상세 보기 화면
    @RequestMapping("/student_detail")
    public ModelAndView student_detail() {
//        log.debug("student_detail");
        ModelAndView view = new ModelAndView("student_detail");
        return view;
    }

    //4. 설정 화면_클래스_리스트
    @RequestMapping("/class_list")
    public ModelAndView class_list() {
//        log.debug("setting_class_list");
        ModelAndView view = new ModelAndView("class_list");
        return view;
    }

    //5. 클래스 화면
    @RequestMapping(value="/class",method=RequestMethod.POST)
    public ModelAndView _class(Long authClassIdx) {
//        System.out.println(authClassIdx);
//        log.debug("class");
//        Class _class = classService.findClass(curClassIdx).get();
        ModelAndView view = new ModelAndView("class");

//        필요없어보인다
//        view.addObject("curClassIdx",_class.getClassIdx());
        view.addObject("authClass",adminService.findAuthClassByAuthClassId(authClassIdx));

        return view;
    }

    //4. 설정 화면
    @RequestMapping("/setting")
    public ModelAndView setting() {
//        log.debug("setting");
        ModelAndView view = new ModelAndView("setting");
        return view;
    }

    //4. 설정 화면_클래스_리스트
    @RequestMapping("/setting_class_list")
    public ModelAndView setting_class_list() {
//        log.debug("setting_class_list");
        ModelAndView view = new ModelAndView("setting_class_list");
        return view;
    }

    //4. 설정 화면_클래스
    @RequestMapping(value="/setting_class",method=RequestMethod.POST)
    public ModelAndView setting_class(Long authClassIdx) {
//        System.out.println(authClassIdx);
//        log.debug("setting_class");
        ModelAndView view = new ModelAndView("setting_class");
        view.addObject("authClass",adminService.findAuthClassByAuthClassId(authClassIdx));
        return view;
    }



    //4. 설정 화면_학생
    @RequestMapping("/setting_student")
    public ModelAndView setting_student() {
//        log.debug("setting_student");
        ModelAndView view = new ModelAndView("setting_student");
        return view;
    }

    //4. 성적표 화면
    @RequestMapping("/reportcard")
    public ModelAndView reportCard() {
//        log.debug("reportcard");
        ModelAndView view = new ModelAndView("reportcard");
        return view;
    }




}
