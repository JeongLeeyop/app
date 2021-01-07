package com.example.app.service;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.AuthStudent;
import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.*;
import com.example.app.repository.AttendanceRepository;
import com.example.app.repository.AuthStudentRepository;
import com.example.app.repository.SeasonRepository;
import com.example.app.repository.StudentRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.*;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepo;
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    AuthStudentRepository authStudentRepo;

    //1.캘린더를 통해 일별로 하루의 총 출석, 지각, 결석, 조퇴 횟수를 간략하게 표시해주는 기능
    public Map<String,Object> findTotalAtSummary(String strDate,HttpSession session) throws Exception {

        String searchDate = strDate.substring(0,7);

        String startDate = searchDate + "-01";
        Timestamp startTimeStamp = Timestamp.valueOf(startDate + " 00:00:00");
        String endDate = searchDate + "-31";
        Timestamp endTimeStamp = Timestamp.valueOf(endDate + " 00:00:00");

        System.out.println(startDate);
        System.out.println(endDate);

        List<AtSummaryResponse> list = attendanceRepo.findAtCount(startTimeStamp,endTimeStamp,(Account)session.getAttribute("Account"));
        List<Timestamp> dateCnt = attendanceRepo.useDateCnt(startTimeStamp,endTimeStamp,(Account)session.getAttribute("Account"));
        Map<String,Object> map = new HashMap<String,Object>();

        map.put("list",list);
        map.put("useDateCnt",dateCnt);
        return map;
    }

    //1.캘린더를 통해 일별로 하루의 총 출석, 지각, 결석, 조퇴 횟수를 간략하게 표시해주는 기능
    public Map<String,Object> findTotalAtSummary2(Long curSeasonIdx,HttpSession session) throws Exception {

        List<present> present = attendanceRepo.findPresentList((Account)session.getAttribute("Account"),curSeasonIdx);
        List<leave> leave = attendanceRepo.findLeaveList((Account)session.getAttribute("Account"),curSeasonIdx);
        List<tardy> tardy = attendanceRepo.findTardyList((Account)session.getAttribute("Account"),curSeasonIdx);
        List<absent> absent = attendanceRepo.findAbsentList((Account)session.getAttribute("Account"),curSeasonIdx);

        Map<String,Object> map = new HashMap<String,Object>();

        map.put("present",present);
        map.put("leave",leave);
        map.put("tardy",tardy);
        map.put("absent",absent);
        return map;
    }

    //1.캘린더를 통해 일별로 하루의 총 출석, 지각, 결석, 조퇴 횟수를 간략하게 표시해주는 기능
    public List<Attendance> findAtByDate(String strDate,Long curSeasonIdx,HttpSession session) throws Exception {

        Timestamp curDate = Timestamp.valueOf(strDate + " 00:00:00");
        List<Attendance> curDateList = new ArrayList<>();

        Account account = (Account)session.getAttribute("Account");
        List<AuthStudent> stList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount(curSeasonIdx,account);
//        List<Student> stList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount(account);

        for(AuthStudent authStudent : stList){
            Attendance at = attendanceRepo.findAllByAtDateAndAuthStudent(curDate,authStudent);
            if(at!=null) curDateList.add(at);
        }
        return curDateList;
    }

    //1.캘린더를 통해 일별로 하루의 총 출석, 지각, 결석, 조퇴 횟수를 간략하게 표시해주는 기능
    public int findCalendarAt(int a) {
        return 0;
    }

    //2.학생별 전체 출석 현황을 조회
    public List<atCountResponse> findTotalAt(Long curSeasonIdx, HttpSession session) {

        //현 유저의 모든 학생 불러오기
//        List<Student> stList = studentRepo.findStudentByAccount( (Account) session.getAttribute("Account") );
        List<AuthStudent> stList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount(curSeasonIdx,(Account) session.getAttribute("Account"));
        List<atCountResponse> atCountList = new ArrayList<>();
        for(AuthStudent authStudent : stList) {
            atCountResponse atCountResponse = new atCountResponse();
            atCountResponse.setStudentIdx(authStudent.getAuthStudentIdx());
            atCountResponse.setStudentName(authStudent.getStudent().getStudentName());
            atCountResponse.setPerfectAt("True");

            for (int i = 0; i <= 6; i++){
                Long state = attendanceRepo.countByAtStateAndAuthStudent(i, authStudent);

                if(i!=0 && state>=1L){
                    atCountResponse.setPerfectAt("False");
                }

                if(i==0) atCountResponse.setPresentCnt(state);
                if(i==1) atCountResponse.setExTardyCnt(state);
                if(i==2) atCountResponse.setTardyCnt(state);
                if(i==3) atCountResponse.setFamilyLeaveCnt(state);
                if(i==4) atCountResponse.setExAbsentCnt(state);
                if(i==5) atCountResponse.setAbsentCnt(state);
                if(i==6) atCountResponse.setEarlyLeaveCnt(state);
            }
            atCountList.add(atCountResponse);
//            System.out.println(atCountList);
        }
        return atCountList;
    }

    //3.선택 날짜의 학생별 출석여부를 조회하는 기능
    public int findDetailAt(int a) {
        return 0;
    }

    //4.선택 날짜의 학생별 출석여부를 입력,수정하는 기능
    @Transactional
    @Modifying
    public void updateAt(String dataArray, String strDate) throws Exception {
        System.out.println(dataArray);
        JsonParser parser = new JsonParser();
        JsonArray jsonArray = (JsonArray) parser.parse(dataArray);

        for(int i=0;i<jsonArray.size();i++) {
            JsonObject object = (JsonObject) jsonArray.get(i);
            Attendance attendance = new Attendance();

            Long stIdx = object.get("stIdx").getAsLong();
            int state = object.get("state").getAsInt();

            if(object.has("atIdx")){
                Long atIdx = object.get("atIdx").getAsLong();
                attendance.setAtIdx(atIdx);
            }

            //타임스탬프
            Timestamp curDate = Timestamp.valueOf(strDate + " 00:00:00");
            attendance.setAtDate(curDate);
            attendance.setAtState(state);
            //시즌까지 할 필요는 없을듯.
            attendance.setAuthStudent(authStudentRepo.findById(stIdx).get());

            //값 insert 또는 update
            System.out.println("========" + attendance);
            attendanceRepo.save(attendance);
        }
    }

    //5.선택 날짜의 학생별 출석여부를 삭제하는 기능
    @Transactional
    @Modifying
    public void deleteAt(String strDate,Long curSeasonIdx, HttpSession session) {

        Account account = (Account)session.getAttribute("Account");

        List<AuthStudent> stList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccount(curSeasonIdx,account);

        Timestamp curDate = Timestamp.valueOf(strDate + " 00:00:00");

        for(AuthStudent authStudent : stList){
            attendanceRepo.deleteAllByAtDateAndAuthStudent(curDate,authStudent);
        }
    }

    //최초 시즌 설정
    public Long SeasonInit(HttpSession session) {
        Account account = (Account)session.getAttribute("Account");
        System.out.println(account);
        Long curSeasonIdx = seasonRepo.findFirstBySchoolOrderBySeasonIdxDesc(account.getSchool()).getSeasonIdx();
        return curSeasonIdx;
    }
}
