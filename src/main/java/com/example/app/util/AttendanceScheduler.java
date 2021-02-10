package com.example.app.util;


import com.example.app.model.domain.*;
import com.example.app.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Component
public class AttendanceScheduler {

    @Autowired
    SchoolRepository schoolRepo;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    AccountRepository accountRepo;
    @Autowired
    AuthStudentRepository authStudentRepo;
    @Autowired
    AttendanceRepository attendanceRepo;


    private static Logger logger = LoggerFactory.getLogger(AttendanceScheduler.class);

  /*  @Scheduled(fixedDelay = 3000)
    public void alert() throws Exception{

        Calendar now = Calendar.getInstance();
        now.setTime(new Date());
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String strDate = DateFormat.format(now.getTime());
        Timestamp curDate = Timestamp.valueOf(strDate + " 00:00:00");
        logger.info(curDate.toString());

        now.add(Calendar.DATE,-1);
        strDate = DateFormat.format(now.getTime());
        curDate = Timestamp.valueOf(strDate + " 00:00:00");
        logger.info(curDate.toString());
    }*/

    @Scheduled(cron = "0 0 0 * * 2-6")
    public void AttendanceAutoSave() {
        logger.info("현재 시간 : {}", new Date());

        //현재 시간 - 1일

        Calendar now = Calendar.getInstance();
        now.setTime(new Date());
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");

        now.add(Calendar.DATE,-1);
        String strDate = DateFormat.format(now.getTime());
        Timestamp curDate = Timestamp.valueOf(strDate + " 00:00:00");

        logger.info(curDate.toString());

        //학교
        List<School> schoolList = schoolRepo.findAll();
        //유저 (운영자가 아닌, autoSave가 1인)


        for (School school : schoolList) {
            //현재 학교의 가장 최근 시즌 찾기
            Long seasonIdx = seasonRepo.findFirstBySchoolOrderBySeasonIdxDesc(school).getSeasonIdx();

            logger.info("학교 이름 : "+school.getSchoolName());
            logger.info("최근 시즌 Idx : "+seasonIdx);

            //현재 학교의 관리자가 아니면서 autosave가 1인 선생님 찾기
            List<Account> accountList = accountRepo.findBySchoolAndAuthorityIsNotAndAutoSaveIsNot(school, 1, 0);
            //시즌
            for (Account account : accountList) {

                logger.info("AutoSave 선생님 이름 : "+account.getUserName());

                //현재 Attendance에 이미 값이 들어있는지 체크
                if (attendanceRepo.findByCurDate(curDate, account.getUserIdx(), seasonIdx) == 0) {

                    logger.info(curDate + " : 오늘 날짜에 출석데이터 없음.");

                    //가장 최근 Season의 현재 선생님의 authStudent 찾기
                    List<AuthStudent> authStudentList = authStudentRepo.findAuthStudentBySeason_SeasonIdxAndAccountOrderByAuthStudentIdx(seasonIdx, account);

                    //전체 출석 체크
                    for (AuthStudent authStudent : authStudentList) {

                        logger.info("auth학생 이름 : "+authStudent.getStudent().getStudentName());

                        Attendance attendance = new Attendance();
                        attendance.setAtDate(curDate);
                        attendance.setAtState(0);
                        attendance.setAuthStudent(authStudent);
                        attendanceRepo.save(attendance);

                        logger.info("출석 저장 정보 : "+attendance);
                    }

                }

            }
        }
    }


}
