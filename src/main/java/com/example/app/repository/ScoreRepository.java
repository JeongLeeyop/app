package com.example.app.repository;

import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.Score;
import com.example.app.model.dto.response.repository.ScoreMapping;
import com.example.app.model.domain.section.Section;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.repository.UsedTaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;


public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query("DELETE FROM Score t where t.task.taskIdx = ?1")
    @Transactional
    @Modifying
    public void DelScoreByTaskIdx(Long taskIdx);

    @Query("DELETE FROM Score t where t.task.taskIdx in (select i from Task i where i._class.classIdx = ?1)")
    @Transactional
    @Modifying
    public void DelScoreByClassIdx(Long ClassIdx);

    @Query("DELETE FROM Score t where t.section.sectionIdx = ?1")
    @Transactional
    @Modifying
    public void DelScoreBySectionIdx(Long sectionIdx);

    @Query("DELETE FROM Score t where t.section.sectionIdx = ?1 And t.task.taskIdx = ?2")
    @Transactional
    @Modifying
    public void delTask(Long sectionIdx,Long sectionTasksIdx);


    @Transactional
    @Modifying
    public void deleteByStudent(Student student);

    @Transactional
    @Modifying
    @Query("update Score t set t.score = ?1 Where t.scoreIdx = ?2")
    public void updateScore(Long score, Long scoreIdx);


    //과제 차트 데이터 불러오기
    public List<ScoreMapping> findAllBySectionOrderByStudent(Section curSection);

    //사용중인 과제항목 불러오기
    public List<UsedTaskList> findDistinctBySection(Section section);

    @Query("select t from Score t where t.section.sectionIdx = ?1 and t.task.taskIdx=?2")
    public List<Score> findScoreBySectionAndTask(Long sectionIdx, Long taskIdx);

    @Query("select t.task.taskIdx as task, t.authStudent.authStudentIdx as student, count(t.score) as count, sum(t.score/s.maxScore*100) as sum from Score t left outer join SectionTasks s ON t.section.sectionIdx = s.section.sectionIdx AND t.task.taskIdx = s.task.taskIdx where t.task.taskIdx In (select ti.taskIdx from Task ti where ti.authClass.authClassIdx = ?1) AND t.authStudent.authStudentIdx In (select s.authStudentIdx from AuthStudent s where s.account.userIdx = ?2) group by t.task.taskIdx,t.authStudent.authStudentIdx order by t.authStudent.authStudentIdx,t.task.taskIdx")
    public List<TotalGradeMapping> findTotalGrade(Long curClassIdx, Long curUserIdx);
}
