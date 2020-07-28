package com.example.app.controller;

import com.example.app.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class StudentController {

    @Autowired
    StudentService studentService;

    //1. 특정학생의 상세정보를 조회하는 기능
    @RequestMapping("findStudentDetail")
    public ModelAndView findStudentDetail(HttpServletRequest req) {
        return null;
    }

}



