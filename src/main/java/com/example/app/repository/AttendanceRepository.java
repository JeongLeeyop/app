package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.AtSummaryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
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

}
