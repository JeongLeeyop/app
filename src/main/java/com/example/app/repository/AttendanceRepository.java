package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.repository.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

public interface AttendanceRepository extends JpaRepository <Attendance, Long> {

    public Attendance findAllByAtDateAndStudent(Timestamp date, Student student);

    public Long countByAtStateAndStudent(int i, Student student);

    @Transactional
    @Modifying
    public void deleteAllByAtDateAndStudent(Timestamp date, Student student);

    @Transactional
    @Modifying
    public void deleteByStudent(Student student);

    @Query(value = "select a.atDate as atDate,a.atState as atState, count(a.atState) as count from Attendance a left join Student s on a.student.studentIdx = s.studentIdx where a.atDate between ?1 and ?2 and s.account = ?3 group by a.atDate,a.atState")
    public List<AtSummaryResponse> findAtCount(Timestamp startTimeStamp, Timestamp endTimeStamp, Account account);

    @Query(value = "select DISTINCT a.atDate as atDate from Attendance a left join Student s on a.student.studentIdx = s.studentIdx where a.atDate between ?1 and ?2 and s.account = ?3")
    public List<Timestamp> useDateCnt(Timestamp startTimeStamp, Timestamp endTimeStamp, Account account);

    @Query(value = "select a.atDate as atDate, Count(a) as present FROM Attendance a where a.atState = 0 AND a.student.studentIdx IN (select s.studentIdx from Student s where s.account = ?1) group by a.atDate order by a.atDate")
    public List<present> findPresentList(Account account);

    @Query(value = "select a.atDate as atDate, Count(a) as tardy FROM Attendance a where a.atState in (1,2) AND a.student.studentIdx IN (select s.studentIdx from Student s where s.account = ?1) group by a.atDate order by a.atDate")
    public List<tardy> findTardyList(Account account);

    @Query(value = "select a.atDate as atDate, Count(a) as absent FROM Attendance a where a.atState in(4,5) AND a.student.studentIdx IN (select s.studentIdx from Student s where s.account = ?1) group by a.atDate order by a.atDate")
    public List<absent> findAbsentList(Account account);

    @Query(value = "select a.atDate as atDate, Count(a) as leave FROM Attendance a where a.atState in(3,6) AND a.student.studentIdx IN (select s.studentIdx from Student s where s.account = ?1) group by a.atDate order by a.atDate")
    public List<leave> findLeaveList(Account account);


}

