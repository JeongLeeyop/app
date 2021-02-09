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

    //AuthClass로 Section을 찾고 해당 SectionTasks을 찾아 전부 삭제
    @Transactional
    @Modifying
    @Query("DELETE FROM SectionTasks s where s.section.sectionIdx in (select ss.sectionIdx from Section ss where ss.authClass.authClassIdx = ?1)")
    public void DelSectionTasksByAuthClassIdx(Long authClassIdx);

    @Transactional
    @Modifying
    @Query("update SectionTasks s set s.maxScore = ?2, s.Memo = ?3 where s.sectionTasksIdx=?1")
    public void updateMaxScore(Long sectionTasksIdx, Double maxScore,String memo);

    @Query("select si from SectionTasks si where si.section.sectionIdx In (select max(s.sectionIdx) from Section s where s.authClass.authClassIdx = ?1) order by si.sectionTasksIdx")
    public List<SectionTasks> findLastSectionTasks(Long curClassIdx);
}
