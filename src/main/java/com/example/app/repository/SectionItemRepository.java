package com.example.app.repository;

import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.SectionItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface SectionItemRepository extends CrudRepository<SectionItem, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionItem s where s.section.sectionIdx = ?1")
    public void DelSectionItemBySectionIdx(Long sectionIdx);

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionItem s where s.taskItemInfo.taskItemInfoIdx = ?1")
    public void DelSectionItemByTaskIdx(Long taskItemInfoIdx);

    @Query("Select s From SectionItem s where s.section.sectionIdx = ?1 order by s.sectionItemIdx")
    public List<SectionItem> findSectionItemBySectionIdx(Long sectionIdx);

    @Transactional
    @Modifying
    @Query("DELETE FROM SectionItem s where s.section.sectionIdx in (select ss.sectionIdx from Section ss where ss._class.classIdx = ?1)")
    public void DelSectionItemByClassIdx(Long classIdx);

    @Query("select si from SectionItem si where si.section.sectionIdx In (select max(s.sectionIdx) from Section s where s._class.classIdx = ?1)")
    public List<SectionItem> findLastSectionItem(Long classIdx);
}
