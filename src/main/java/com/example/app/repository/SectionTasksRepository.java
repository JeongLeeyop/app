package com.example.app.repository;

import com.example.app.model.domain.section.SectionTasks;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface SectionTasksRepository extends CrudRepository<SectionTasks, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionTasks s where s.section.sectionIdx = ?1")
    public void DelSectionTasksIdxBySectionIdx(Long sectionIdx);

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionTasks s where s.task.taskIdx = ?1")
    public void DelSectionTasksByTaskIdx(Long taskIdx);

    @Query("Select s From SectionTasks s where s.section.sectionIdx = ?1 order by s.sectionTasksIdx")
    public List<SectionTasks> findSectionTasksBySectionIdx(Long sectionIdx);

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionTasks s where s.section.sectionIdx in (select ss.sectionIdx from Section ss where ss._class.classIdx = ?1)")
    public void DelSectionTasksByClassIdx(Long classIdx);

    @Transactional
    @Modifying
    @Query("update SectionTasks s set s.maxScore = ?2 where s.sectionTasksIdx=?1")
    public void updateMaxScore(Long sectionTasksIdx, Double maxScore);

    @Query("select si from SectionTasks si where si.section.sectionIdx In (select max(s.sectionIdx) from Section s where s._class.classIdx = ?1) order by si.sectionTasksIdx")
    public List<SectionTasks> findLastSectionTasks(Long classIdx);
}
