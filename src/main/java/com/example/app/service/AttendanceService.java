package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {

//    @Autowired
//    AttendanceRepository attendanceRepo;

    //1.캘린더를 통해 일별로 하루의 총 출석, 지각, 결석, 조퇴 횟수를 간략하게 표시해주는 기능
    public int findCalendarAt(int a) {
        return 0;
    }

    //2.학생별 전체 출석 현황을 조회
    public int findTotalAt(int a) {
        return 0;
    }

    //3.선택 날짜의 학생별 출석여부를 조회하는 기능
    public int findDetailAt(int a) {
        return 0;
    }

    //4.선택 날짜의 학생별 출석여부를 입력,수정하는 기능
    public int updateDetailAt(int a) {
        return 0;
    }

    //5.선택 날짜의 학생별 출석여부를 삭제하는 기능
    public int deleteDetailAt(int a) {
        return 0;
    }
}
