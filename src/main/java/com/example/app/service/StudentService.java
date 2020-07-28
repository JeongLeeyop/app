package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Service
public class StudentService {

//    @Autowired
//    StudentRepository studentRepo;

    //전체 학생별 총 출석, 지각, 결석, 조퇴 횟수를 출력하는 기능
    //attendanceservice.findTotalAt() 사용

    //1. 전체 학생별 클래스별 최종 성적 출력
    public int findAllGrade(int a) {
        return 0;
    }

    //2. 특정 학생의 출석 일을 캘린더로 조회하는 기능
    public int findStudentDetailAt(int a) {
        return 0;
    }

    //3. 특정 학생의 과목별 과제 항목 점수를 그래프로 조회하는 기능
    public int findStudentDetailTaskScore(int a) {
        return 0;
    }

    //4. 특정 학생의 클래스별 상세 등급 현황을 조회하는 기능
    public int findStudentDetailGrade(int a) {
        return 0;
    }


}

