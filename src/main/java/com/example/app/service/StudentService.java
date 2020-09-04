package com.example.app.service;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.studentChartResponse;
import com.example.app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepo;

    @Autowired
    SettingService settingService;
    @Autowired
    AttendanceService attendanceService;
    @Autowired
    ClassService classService;


    //전체 학생별 총 출석, 지각, 결석, 조퇴 횟수를 출력하는 기능
    //attendanceservice.findTotalAt() 사용

    //1. 한 학생을 찾는 기능
    public Student findStudent(Long stIdx) {
        return studentRepo.findById(stIdx).get();
    }

    //5. 전체 학생을 조회하는 기능
    public List<Student> findStudentList(HttpSession session) {
        List<Student> student = studentRepo.findStudentByAccount((Account) session.getAttribute("Account"));
        return student;
    }

    // 학생별 전체 요약
    //1. 전체 학생의 정보를 조회하는 기능
    public List<studentChartResponse> findStudentSummary(HttpSession session) {
        session.getAttribute("Account");

        //. 전체 클래스명 출력 : 열
        System.out.println("전체 클래스명 출력");
        List<Class> _class = classService.findClassList(session);
        System.out.println("=========> " + _class);

        //. 전체 학생명 출력 : 행
        System.out.println("전체 학생명 출력");
        List<Student> studentList = this.findStudentList(session);
        System.out.println("=========> " + studentList);

        //. 전체 학생 출결일 출력
        System.out.println("전체 학생 출결일 출력");
        List<atCountResponse> atCntResList = attendanceService.findTotalAt(session);


        List<studentChartResponse> chartList = new ArrayList<studentChartResponse>();
        for (int i = 0; i < studentList.size(); i++) {

            studentChartResponse studentChartRes = new studentChartResponse();
            //성적을 담을 list선언
            List<String> studentGradeList = new ArrayList<String>();



            String str="null";
            //학생당 출석일 도출하기;
            for (atCountResponse item : atCntResList) {
                if (studentList.get(i).getStudentIdx().equals(item.getStudentIdx())) {
                    Long extardy = item.getExTardyCnt();
                    Long tardy = item.getTardyCnt();
                    Long absent = item.getAbsentCnt();
                    Long exabsent = item.getExAbsentCnt();
                    Long fleave = item.getFamilyLeaveCnt();
                    Long eleave = item.getEarlyLeaveCnt();
                    String perfect = item.getPerfectAt();
                    Long present = item.getPresentCnt();
                    str = present + " | " + (extardy + tardy) + " | " + (absent + exabsent) + " | " + (fleave + eleave) + " | " + perfect.substring(0, 1);
                }
            }
            for (int j = 0; j < _class.size(); j++) {
                studentGradeList.add("null");
            }
            studentChartRes.setStudentName(studentList.get(i).getStudentName());
            studentChartRes.setStudentIdx(studentList.get(i).getStudentIdx());
            studentChartRes.setStudentAttendance(str);
            studentChartRes.setStudentGrade(studentGradeList);
            chartList.add(studentChartRes);
        }

        System.out.println(chartList);


        return chartList;
    }

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

