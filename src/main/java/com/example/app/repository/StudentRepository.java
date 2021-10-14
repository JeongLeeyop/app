package com.example.app.repository;

import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.repository.studentGroup;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Long> {

    @Query("select s from Student s where s.season.seasonIdx = ?1")
    public List<Student> findStudentByAccount(Long curSeasonIdx, Sort sort);

    @Query("select s from Student s where s.season.seasonIdx = ?1 AND s.studentIdx not In (select a.student.studentIdx from AuthStudent a where a.account.userIdx = ?2)")
    public List<Student> findStudentByAccountWithoutAuthStudent(Long curSeasonIdx, Long userIdx,Sort sort);

//    @Query("select DISTINCT s.studentGroup, s.studentGrade from Student s where s.season.seasonIdx = ?1 ORDER BY s.studentGroup")
    @Query("select s.studentGroup as studentGroup , s.studentGrade as studentGrade from Student s where s.season.seasonIdx = ?1 Group BY s.studentGroup, s.studentGrade order by s.studentGroup")
    public List<studentGroup> findClassList_WithoutAuth(Long curSeasonIdx);

    @Query("SELECT s.studentGroup as studentGroup ,s.studentGrade as studentGrade FROM AuthStudent as2 LEFT OUTER JOIN Student s ON as2.student.studentIdx = s.studentIdx WHERE as2.account.userIdx = ?2 AND as2.season.seasonIdx = ?1 GROUP BY s.studentGroup ,s.studentGrade ORDER BY s.studentGroup")
    public List<studentGroup> findAuthClassList_Group(Long curSeasonIdx, Long userIdx);

    public List<Student> findAll();

    @Query("select DISTINCT a.studentGroup from Student a where a.season.seasonIdx=?1 ORDER BY a.studentGroup")
    public List<String> findStudentGroupList(Long seasonIdx);

    public List<Student> findStudentBySeason_SeasonIdx(Long seasonIdx,Sort Sort);

    //시즌과 클래스명으로 찾기
    @Query("select s from Student s where s.studentGroup = ?1 and s.season.seasonIdx=?2 order by s.studentGroup")
    public List<Student> findByStudentStudentGroupAndSeasonSeasonIdx(String className, Long seasonIdx);
}
