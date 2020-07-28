package com.example.app.controller;

import com.example.app.service.AttendanceService;
import com.example.app.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class ClassController {

    @Autowired
    ClassService classService;

    //1. 클래스의 섹션을 추가하는 기능
    @RequestMapping("addSection")
    @ResponseBody
    public ModelAndView addSection(HttpServletRequest req) {
        return null;
    }

    //2. 클래스의 섹션을 삭제하는 기능
    @RequestMapping("delSection")
    @ResponseBody
    public ModelAndView delSection(HttpServletRequest req) {
        return null;
    }

    //3. 클래스의 섹션의 이름을 수정하는 기능
    @RequestMapping("sectionName")
    @ResponseBody
    public ModelAndView sectionName(HttpServletRequest req) {
        return null;
    }

    //4. 섹션의 과제 항목과 점수를 조회하는 기능
    @RequestMapping("findTask")
    public ModelAndView findTask(HttpServletRequest req) {
        return null;
    }

    //5. 섹션의 과제 항목을 추가하는 기능
    @RequestMapping("addTask")
    public ModelAndView addTask(HttpServletRequest req) {
        return null;
    }

    //6. 섹션의 과제 항목을 삭제하는 기능
    @RequestMapping("delTask")
    public ModelAndView delTask(HttpServletRequest req) {
        return null;
    }

    //7. 섹션의 과제 항목을 이름을 수정하는 기능
    @RequestMapping("taskName")
    public ModelAndView taskName(HttpServletRequest req) {
        return null;
    }

    //8. 과제 점수를 입력, 수정하는 기능
    @RequestMapping("scoreUpdate")
    public ModelAndView scoreUpdate(HttpServletRequest req) {
        return null;
    }
}
