package com.example.app.service;

import com.example.app.common.OrderByCode;
import com.example.app.model.domain.*;
import com.example.app.model.domain.section.Task;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.studentChartResponse;
import com.example.app.model.dto.response.totalGradeResponse;
import com.example.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
    ScoreRepository scoreRepo;
    @Autowired
    TaskRepository taskRepo;
    @Autowired
    AuthStudentRepository authstudentRepo;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    ClassMembersRepository classMembersRepo;

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

    //2. 관리자 계정의 전체 학생을 조회하는 기능
    public List<Student> findStudentList(Long curSeasonIdx, Long orderBy, HttpSession session) {

        Sort sort = Sort.by(Sort.Direction.ASC, "studentIdx");
        if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "studentGrade");
        } else if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "studentName");
        }

        List<Student> student = studentRepo.findStudentByAccount(curSeasonIdx, sort);
        return student;
    }

    //3. 일반 계정의 권한 부여된 학생목록을 조회하는 기능
    public List<AuthStudent> findAuthStudentList(Long curSeasonIdx, HttpSession session) {
        List<AuthStudent> student = authstudentRepo.findAuthStudentBySeason_SeasonIdxAndAccountOrderByAuthStudentIdx(curSeasonIdx, (Account) session.getAttribute("Account"));
        return student;
    }

    // 학생별 전체 요약
    //1. 전체 학생의 정보를 조회하는 기능
    public Map<String, Object> findStudentSummary(Long curSeasonIdx, HttpSession session) {

        Map resultMap = new HashMap();
        session.getAttribute("Account");

        //classMembers찾기용 sort
        Sort sort = Sort.by(Sort.Direction.ASC, "classMembersIdx");

        //. 전체 클래스명 출력 : 열
//        System.out.println("전체 클래스명 출력");
        List<AuthClassMapping> authClassList = classService.findAuthClassList(session, curSeasonIdx);

        //. 전체 학생명 출력 : 행
//        System.out.println("전체 학생명 출력");
        List<AuthStudent> authStudentList = this.findAuthStudentList(curSeasonIdx, session);
//        System.out.println("=========> " + authStudentList);

        //. 전체 학생 출결일 출력
//        System.out.println("전체 학생 출결일 출력");
        List<atCountResponse> atCntResList = attendanceService.findTotalAt(curSeasonIdx, session);


        //출결일 구하기
        List<studentChartResponse> chartList = new ArrayList<studentChartResponse>();
        for (int i = 0; i < authStudentList.size(); i++) {

            studentChartResponse studentChartRes = new studentChartResponse();

            //성적을 담을 list선언
            List<String> studentGradeList = new ArrayList<String>();

            String str = "null";
            //학생당 출석일 도출하기;
            for (atCountResponse item : atCntResList) {
                if (authStudentList.get(i).getAuthStudentIdx() == item.getStudentIdx()) {
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
            for (int j = 0; j < authClassList.size(); j++) {
                studentGradeList.add("null");
            }

            studentChartRes.setStudentName(authStudentList.get(i).getStudent().getStudentName());
            studentChartRes.setStudentIdx(authStudentList.get(i).getAuthStudentIdx());
            studentChartRes.setStudentAttendance(str);
            chartList.add(studentChartRes);
        }

        //구한 출결일 Map에 입력
        resultMap.put("Attendance", chartList);

        /////////////////////////////////////
        //최종성적 구하기
        Account curAccount = (Account) session.getAttribute("Account");

        //최종 값을 담을 변수 선언
        List<totalGradeResponse> result2 = new ArrayList<totalGradeResponse>();

        for (AuthClassMapping curClassMapping : authClassList) {
            List<totalGradeResponse> result = new ArrayList<totalGradeResponse>();
            //클래스의 최종 등급이 들어갈 변수 선언
            Double tempGrade = 0.0;

            //스코어 차트를 들고 온다.
            List<TotalGradeMapping> totalGradeList = scoreRepo.findTotalGrade(curClassMapping.getAuthclass(), curAccount.getUserIdx());

            //등급 비율을 위해 과제정보를 들고 온다.
            List<Task> task = taskRepo.findTaskByClassIdx(curClassMapping.getAuthclass());

            //등급 기준을 Map에 저장
            Map<Long, Long> map = new HashMap<Long, Long>();
            for (Task item : task) {
                map.put(item.getTaskIdx(), item.getTaskGradeRatio());
            }

            //과제 최종 성적 구하기
            for (TotalGradeMapping item : totalGradeList) {

                Long curTaskIdx = item.getTask();
                Long gradeRatio = map.get(curTaskIdx);
//            System.out.println("gradeRatio : "+ gradeRatio);

                //성적 매기기
                //데이터가 없을 경우 공백처리를 위해 null로 세팅
                if (item.getSum() == null) {
                    tempGrade = null;
                } else if (item.getSum() == 0.0) {
                    tempGrade = 0.0;
                } else if (gradeRatio == 0L) {
                    tempGrade = 0.0;
                } else {
                    tempGrade = (item.getSum().doubleValue() / item.getCount()) * gradeRatio / 100;
                }
//                System.out.println(" authClass : " + curClassMapping.getAuthclass() + " classMembersIdx : " + item.getStudent() + " TempGrade : " + tempGrade);
                result.add(new totalGradeResponse(item.getStudent(), curTaskIdx, null, tempGrade, null));
            }

            //현재 authClass의 classMembers를 구해준다.
            List<ClassMembers> classMembersList = classMembersRepo.findByAuthClass_AuthClassIdx(curClassMapping.getAuthclass(), sort);

            //학생 수만큼 추가해준다.
            for (AuthStudent authStudent : authStudentList) {

                //classMembers가 아닌 authStudent를 공백처리하기 위해 기본값null로 셋팅
                Double finalGrade = null;
                //현재 authClass의 현재authStudent의 classMembersIdx를 찾아내기
                for (ClassMembers classMembers : classMembersList) {
                    if (classMembers.getAuthStudent().getAuthStudentIdx() == authStudent.getAuthStudentIdx()) {

                        //클래스 최종 성적 구하기
                        for (totalGradeResponse item2 : result) {
                            if (classMembers.getClassMembersIdx() == item2.getStudentIdx()) {
                                //초기값

                                //성적이 존재할때
                                if (item2.getFinalGrade() != null) {
                                    //최종성적 변수가 null이면 에러를 막기 위해 0으로 초기화하고 점수를 합산해준다.
                                    if (finalGrade == null) {
                                        finalGrade = 0.0;
                                    }
                                    finalGrade = finalGrade + item2.getFinalGrade();
                                }
                            }
                        }
                    }
                }
                result2.add(new totalGradeResponse(authStudent.getAuthStudentIdx(), null, null, finalGrade, curClassMapping.getAuthclass()));

//                System.out.println("studentIdx : " + authStudent.getStudentIdx() + " classIdx :  " + curClassMapping.getClassIdx() + " finalGrade : " + finalGrade);
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

