package com.example.app.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j
public class MainViewController {

    //1. 로그인 화면
    @RequestMapping("/login")
    public ModelAndView login() {
//        log.debug("login");
        ModelAndView view = new ModelAndView("login");
        return view;
    }

    //2. 회원 가입 화면
    @RequestMapping("/register")
    public ModelAndView register() {
//        log.debug("register");
        ModelAndView view = new ModelAndView("register");
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

    //4. 출석 화면
    @RequestMapping("/attendance")
    public ModelAndView attendance() {
//        log.debug("attendance");
        ModelAndView view = new ModelAndView("attendance");
        return view;
    }

    //5. 수업 화면
    @RequestMapping("/class")
    public ModelAndView _class() {
//        log.debug("class");
        ModelAndView view = new ModelAndView("class");
        return view;
    }

    //4. 설정 화면
    @RequestMapping("/setting")
    public ModelAndView setting() {
//        log.debug("setting");
        ModelAndView view = new ModelAndView("setting");
        return view;
    }

    //4. 설정 화면
    @RequestMapping("/setting_class")
    public ModelAndView setting_class() {
//        log.debug("setting_class");
        ModelAndView view = new ModelAndView("setting_class");
        return view;
    }

    //4. 성적표 화면
    @RequestMapping("/reportCard")
    public ModelAndView reportCard() {
//        log.debug("reportCard");
        ModelAndView view = new ModelAndView("reportCard");
        return view;
    }
}
