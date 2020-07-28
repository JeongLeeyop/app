package com.example.app.controller;

import com.example.app.service.ReportCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class ReportCardController {

    @Autowired
    ReportCardService reportCardService;

    //1. 등록된 성적을 반영하여 학생별로 성적표를 조회하는 기능
    @RequestMapping("findReportCard")
    public ModelAndView findReportCard(HttpServletRequest req) {
        return null;
    }

    //2. 학생별 프린트 출력하는 기능
    @RequestMapping("print")
    public ModelAndView print(HttpServletRequest req) {
        return null;
    }

    //3. 전체 프린트 출력하는 기능
    @RequestMapping("printAll")
    public ModelAndView printAll(HttpServletRequest req) {
        return null;
    }

    //4. 현재 학기와 졸업 예정일을 입력받아 전체 성적표에 적용 시켜주는 기능
    @RequestMapping("reportCardSetting")
    public ModelAndView reportCardSetting(HttpServletRequest req) {
        return null;
    }

    //5. 학생별로 선생님 코멘트와 체크리스트 항목을 입력받아 성적표에 반영하는 기능
    @RequestMapping("saveReportCard")
    public ModelAndView saveReportCard(HttpServletRequest req) {
        return null;
    }

}
