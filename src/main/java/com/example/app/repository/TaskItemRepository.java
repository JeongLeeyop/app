package com.example.app.repository;

import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.repository.TaskItemMapping;
import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.TaskItem;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.repository.UsedTaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;


public interface TaskItemRepository extends JpaRepository<TaskItem, Long> {
    @Query("DELETE FROM TaskItem t where t.taskItemInfo.taskItemInfoIdx = ?1")
    @Transactional
    @Modifying
    public void DelTaskItemByTaskItemInfoIdx(Long taskItemInfoIdx);

    @Query("DELETE FROM TaskItem t where t.taskItemInfo.taskItemInfoIdx in (select i from TaskItemInfo i where i._class.classIdx = ?1)")
    @Transactional
    @Modifying
    public void DelTaskItemByClassIdx(Long ClassIdx);

    @Query("DELETE FROM TaskItem t where t.section.sectionIdx = ?1")
    @Transactional
    @Modifying
    public void DelTaskItemBySectionIdx(Long sectionIdx);

    @Query("DELETE FROM TaskItem t where t.section.sectionIdx = ?1 And t.taskItemInfo.taskItemInfoIdx = ?2")
    @Transactional
    @Modifying
    public void delTask(Long sectionIdx,Long sectionItemIdx);


    @Transactional
    @Modifying
    public void deleteByStudent(Student student);

    @Transactional
    @Modifying
    @Query("update TaskItem t set t.taskScore = ?1 Where t.taskItemIdx = ?2")
    public void updateScore(Long score, Long taskItemIdx);


    //과제 차트 데이터 불러오기
    public List<TaskItemMapping> findAllBySectionOrderByStudent(Section curSection);

    //사용중인 과제항목 불러오기
    public List<UsedTaskList> findDistinctBySection(Section section);

    @Query("select t from TaskItem t where t.section.sectionIdx = ?1 and t.taskItemInfo.taskItemInfoIdx=?2")
    public List<TaskItem> findSectionItemTask(Long sectionIdx, Long taskItemInfoIdx);

    @Query("select t.taskItemInfo.taskItemInfoIdx as task, t.student.studentIdx as student, count(t.taskScore) as count, sum(t.taskScore) as sum from TaskItem t where t.taskItemInfo.taskItemInfoIdx In (select ti.taskItemInfoIdx from TaskItemInfo ti where ti._class.classIdx = ?1) AND t.student.studentIdx In (select s.studentIdx from Student s where s.account.userIdx = ?2) group by t.taskItemInfo.taskItemInfoIdx,t.student.studentIdx order by t.student.studentIdx,t.taskItemInfo.taskItemInfoIdx")
    public List<TotalGradeMapping> findTotalGrade(Long curClassIdx, Long curUserIdx);
}
