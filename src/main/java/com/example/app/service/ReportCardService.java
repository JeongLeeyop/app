package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Service
public class ReportCardService {

//    @Autowired
//    ReportCardRepository reportCardRepo;

    //1.선택한 학생이름을 성적표에 반영하는 기능
    //studentservice사용

    //2.선생님이름을 성적표에 반영하는 기능
    //accountservice사용

    //3. 등록된 성적을 반영하여 학생별로 성적표를 조회하는 기능
    //연구필요
    public int findReportCard(int a) {
        return 0;
    }

    //4. 학생별 프린트 출력하는 기능
    public int print(int a) {
        return 0;
    }

    //5. 전체 프린트 출력하는 기능
    public int printAll(int a) {
        return 0;
    }

    //6. 현재 학기와 졸업 예정일을 입력받아 전체 성적표에 적용 시켜주는 기능
    public int reportCardSetting(int a) {
        return 0;
    }

    //7. 학생별로 선생님 코멘트와 체크리스트 항목을 입력받아 성적표에 반영하는 기능
    public int saveReportCard(int a) {
        return 0;
    }
}
