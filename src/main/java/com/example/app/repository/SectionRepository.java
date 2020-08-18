package com.example.app.repository;

import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.TaskItem;
import com.example.app.model.domain.section.TaskItemInfo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface SectionRepository extends CrudRepository<Section, Long> {

    @Query("delete from Section s where s._class.classIdx = ?1")
    @Transactional
    @Modifying
    public void DelSectionByClassIdx(Long classIdx);

    public void deleteSectionBySectionIdx(Long sectionIdx);

    public List<Section> findSectionBy_class_ClassIdxOrderBySectionIdx(Long classIdx);
}
