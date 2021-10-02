package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.AuthStudent;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.Task;
import com.example.app.model.dto.response.repository.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

public interface AttendanceRepository extends JpaRepository <Attendance, Long> {

    public Attendance findAllByAtDateAndAuthStudent(Timestamp date, AuthStudent authStudent);

    public Long countByAtStateAndAuthStudent(int i, AuthStudent authstudent);

    @Transactional
    @Modifying
    public void deleteAllByAtDateAndAuthStudent(Timestamp date, AuthStudent student);

    @Transactional
    @Modifying
    public void deleteByStudent(Student student);

    @Query(value = "select a.atDate as atDate,a.atState as atState, count(a.atState) as count from Attendance a left join Student s on a.student.studentIdx = s.studentIdx where a.atDate between ?1 and ?2 and s.account = ?3 group by a.atDate,a.atState")
    public List<AtSummaryResponse> findAtCount(Timestamp startTimeStamp, Timestamp endTimeStamp, Account account);

    @Query(value = "select DISTINCT a.atDate as atDate from Attendance a left join Student s on a.student.studentIdx = s.studentIdx where a.atDate between ?1 and ?2 and s.account = ?3")
    public List<Timestamp> useDateCnt(Timestamp startTimeStamp, Timestamp endTimeStamp, Account account);

    @Query(value = "select a.atDate as atDate, Count(a) as present FROM Attendance a where a.atState = 0 AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2) group by a.atDate order by a.atDate")
    public List<present> findPresentList(Account account,Long curSeasonIdx);

    @Query(value = "select a.atDate as atDate, Count(a) as tardy FROM Attendance a where a.atState in (1,2) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2) group by a.atDate order by a.atDate")
    public List<tardy> findTardyList(Account account,Long curSeasonIdx);

    @Query(value = "select a.atDate as atDate, Count(a) as absent FROM Attendance a where a.atState in(4,5) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2) group by a.atDate order by a.atDate")
    public List<absent> findAbsentList(Account account,Long curSeasonIdx);

    @Query(value = "select a.atDate as atDate, Count(a) as leave FROM Attendance a where a.atState in(3,6) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2) group by a.atDate order by a.atDate")
    public List<leave> findLeaveList(Account account,Long curSeasonIdx);



    //현재 선생님의 현재 시즌의 Attendance에 현재 날짜에 데이터가 있는지 검색
    @Query(value = "select COUNT(a) From Attendance a where a.atDate=?1 And a.authStudent.authStudentIdx in (select aa.authStudentIdx from AuthStudent aa where aa.account.userIdx=?2 And aa.season.seasonIdx=?3)")
    public int findByCurDate(Timestamp curDate, Long userIdx, Long curSeasonIdx);

    //AuthStudent로 출석 삭제
    @Transactional
    @Modifying
    public void deleteByAuthStudent_AuthStudentIdx(Long authStudentIdx);

    @Query("select s from Attendance s where s.student = ?1 ")
    public List<Attendance> find(Student student);




    @Query(value = "select a.atDate as atDate, Count(a) as present FROM Attendance a where a.atState = 0 AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2 AND s.authStudentGroup=?3) group by a.atDate order by a.atDate")
    public List<present> findPresentList2(Account account,Long curSeasonIdx,String authStudentGroup);

    @Query(value = "select a.atDate as atDate, Count(a) as tardy FROM Attendance a where a.atState in (1,2) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2 AND s.authStudentGroup=?3) group by a.atDate order by a.atDate")
    public List<tardy> findTardyList2(Account account,Long curSeasonIdx,String authStudentGroup);

    @Query(value = "select a.atDate as atDate, Count(a) as absent FROM Attendance a where a.atState in(4,5) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2 AND s.authStudentGroup=?3) group by a.atDate order by a.atDate")
    public List<absent> findAbsentList2(Account account,Long curSeasonIdx,String authStudentGroup);

    @Query(value = "select a.atDate as atDate, Count(a) as leave FROM Attendance a where a.atState in(3,6) AND a.authStudent.authStudentIdx IN (select s.authStudentIdx from AuthStudent s where s.account = ?1 AND s.season.seasonIdx = ?2 AND s.authStudentGroup=?3) group by a.atDate order by a.atDate")
    public List<leave> findLeaveList2(Account account,Long curSeasonIdx,String authStudentGroup);

}

