package com.example.app.service;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.TaskItemInfo;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.studentChartResponse;
import com.example.app.model.dto.response.totalGradeResponse;
import com.example.app.repository.ClassRepository;
import com.example.app.repository.StudentRepository;
import com.example.app.repository.TaskItemInfoRepository;
import com.example.app.repository.TaskItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepo;
    @Autowired
    ClassRepository classRepo;
    @Autowired
    TaskItemRepository taskItemRepo;
    @Autowired
    TaskItemInfoRepository taskItemInfoRepo;

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
    public Map<String, Object> findStudentSummary(HttpSession session) {

        Map resultMap = new HashMap();
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

            String str = "null";
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

            //최종 성적 구하기
            for (int j = 0; j < _class.size(); j++) {
                studentGradeList.add("null");
            }

            studentChartRes.setStudentName(studentList.get(i).getStudentName());
            studentChartRes.setStudentIdx(studentList.get(i).getStudentIdx());
            studentChartRes.setStudentAttendance(str);
            chartList.add(studentChartRes);
        }

        resultMap.put("Attendance", chartList);

        //최종성적 구하기
        Account curAccount = (Account) session.getAttribute("Account");

        //최종 값을 담을 변수 선언
        List<totalGradeResponse> result2 = new ArrayList<totalGradeResponse>();

        for (Class curClass : _class) {
            List<totalGradeResponse> result = new ArrayList<totalGradeResponse>();
            //클래스의 최종 등급이 들어갈 변수 선언
            Double tempGrade = 0.0;

            //스코어 차트를 들고 온다.
            List<TotalGradeMapping> totalGradeList = taskItemRepo.findTotalGrade(curClass.getClassIdx(), curAccount.getUserIdx());

            //등급 비율을 위해 과제정보를 들고 온다.
            List<TaskItemInfo> taskItemInfo = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClass.getClassIdx());

            //등급 기준을 Map에 저장
            Map<Long, Long> map = new HashMap<Long, Long>();
            for (TaskItemInfo item : taskItemInfo) {
                map.put(item.getTaskItemInfoIdx(), item.getTaskGradeRatio());
            }

            //과제 최종 성적 구하기
            for (TotalGradeMapping item : totalGradeList) {

                Long curTaskIdx = item.getTask();
                Long gradeRatio = map.get(curTaskIdx);
//            System.out.println("gradeRatio : "+ gradeRatio);

                //성적 매기기
                if (item.getSum() == null) {
                    tempGrade = 0.0;
                } else if (gradeRatio == 0L) {
                    tempGrade = 0.0;
                } else {
                    tempGrade = (item.getSum().doubleValue() / item.getCount()) * gradeRatio / 10.0;
                }
                System.out.println(" class : " + curClass.getClassIdx() + " Student : " + item.getStudent() + " TempGrade : " + tempGrade);
                result.add(new totalGradeResponse(item.getStudent(), curTaskIdx, null, tempGrade, null));
            }

            //학생 수만큼 추가해준다.
            for (Student student : studentList) {
                Double finalGrade = 0.0;
                //클래스 최종 성적 구하기
                for (totalGradeResponse item2 : result) {
                    if (student.getStudentIdx().equals(item2.getStudentIdx())) {
                        finalGrade = finalGrade + item2.getFinalGrade();
                    }
                }
                result2.add(new totalGradeResponse(student.getStudentIdx(), null, null, finalGrade, curClass.getClassIdx()));

//                System.out.println("studentIdx : " + student.getStudentIdx() + " classIdx :  " + curClass.getClassIdx() + " finalGrade : " + finalGrade);
            }
        }

        resultMap.put("FinalGrade", result2);

        return resultMap;
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

