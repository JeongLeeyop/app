package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Student;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Long> {

    @Query("select s from Student s where s.season.seasonIdx = ?1")
    public List<Student> findStudentByAccount(Long curSeasonIdx, Sort sort);

    @Query("select s from Student s where s.season.seasonIdx = ?1 AND s.studentIdx not In (select a.student.studentIdx from AuthStudent a where a.account.userIdx = ?2)")
    public List<Student> findStudentByAccountWithoutAuthStudent(Long curSeasonIdx, Long userIdx,Sort sort);

    public List<Student> findAll();

    @Query("select DISTINCT a.studentGroup from Student a where a.season.seasonIdx=?1 ORDER BY a.studentGroup")
    public List<String> findStudentGroupList(Long seasonIdx);

    public List<Student> findStudentBySeason_SeasonIdx(Long seasonIdx,Sort Sort);
}
