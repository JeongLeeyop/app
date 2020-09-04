package com.example.app.controller;

import com.example.app.model.domain.Attendance;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.AtSummaryResponse;
import com.example.app.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    //1.모든 날짜의 출석 요약을 조회하는 기능
    @ResponseBody
    @RequestMapping("findTotalAtSummary")
    public Map<String,Object> findTotalAtSummary(String strDate, HttpSession session)throws Exception {
        return attendanceService.findTotalAtSummary(strDate, session);
    }

    //1.모든 날짜의 출석 요약을 조회하는 기능
    @ResponseBody
    @RequestMapping("findTotalAtSummary2")
    public Map<String,Object> findTotalAtSummary2(HttpSession session)throws Exception {
        return attendanceService.findTotalAtSummary2(session);
    }


    //1.선택 날짜의 학생별 출석여부를 조회하는 기능
    @ResponseBody
    @RequestMapping("findAtByDate")
    public List<Attendance> findAtByDate(String strDate,HttpSession session)throws Exception {
        return attendanceService.findAtByDate(strDate,session);
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
    public void updateAt( @RequestParam String dataArray ,String curDate)throws Exception{
        attendanceService.updateAt(dataArray,curDate);
//        return null;
    }

    //3.선택 날짜의 학생별 출석여부를 삭제하는 기능
    @ResponseBody
    @RequestMapping("deleteAt")
    public String deleteAt(String curDate, HttpSession session) {
        attendanceService.deleteAt(curDate,session);
        return curDate;

    }
}
