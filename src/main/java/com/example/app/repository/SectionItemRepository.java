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

    @Query("Select s From SectionItem s where s.section.sectionIdx = ?1")
    public List<SectionItem> findSectionItemBySectionIdx(Long sectionIdx);

}
