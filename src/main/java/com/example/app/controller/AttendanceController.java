package com.example.app.controller;

import com.example.app.model.domain.Attendance;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    //1.선택 날짜의 학생별 출석여부를 조회하는 기능
    @ResponseBody
    @RequestMapping("findAtByDate")
    public List<Attendance> findAtByDate(String strDate)throws Exception {
        return attendanceService.findAtByDate(strDate);
    }

    //1.학생별 전체 출석을 조회하는 기능
    @ResponseBody
    @RequestMapping("findTotalAt")
    public List<atCountResponse> findTotalAt(HttpSession session)throws Exception {
        return attendanceService.findTotalAt(session);
    }

    //2.선택 날짜의 학생별 출석여부를 입력,수정하는 기능
    @ResponseBody
    @RequestMapping("updateAt")
    public ModelAndView updateDetailAt( @RequestParam String dataArray ,String curDate){
        attendanceService.updateAt(dataArray,curDate);
        return null;
    }

    //3.선택 날짜의 학생별 출석여부를 삭제하는 기능
    @RequestMapping("deleteAt")
    public ModelAndView deleteDetailAt(HttpServletRequest req) {
        return null;
    }
}
