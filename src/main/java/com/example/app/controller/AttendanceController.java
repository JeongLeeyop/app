package com.example.app.controller;

import com.example.app.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    //1.선택 날짜의 학생별 출석여부를 조회하는 기능
    @RequestMapping("findAt")
    public ModelAndView findDetailAt(HttpServletRequest req) {
        return null;
    }

    //2.선택 날짜의 학생별 출석여부를 입력,수정하는 기능
    @RequestMapping("updateAt")
    public ModelAndView updateDetailAt(HttpServletRequest req) {
        return null;
    }

    //3.선택 날짜의 학생별 출석여부를 삭제하는 기능
    @RequestMapping("deleteAt")
    public ModelAndView deleteDetailAt(HttpServletRequest req) {
        return null;
    }
}
