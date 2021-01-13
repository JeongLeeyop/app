package com.example.app.repository;

import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.Section;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface SectionRepository extends CrudRepository<Section, Long> {

    @Query("delete from Section s where s.authClass.authClassIdx = ?1")
    @Transactional
    @Modifying
    public void DelSectionByAuthClassIdx(Long authClassIdx);

    public void deleteSectionBySectionIdx(Long sectionIdx);

    public List<Section> findSectionBy_class_ClassIdxOrderBySectionIdx(Long classIdx);

    public List<Section> findSectionByauthClass_AuthClassIdxOrderBySectionIdx(Long classIdx);

    //

    @Query("select s from Section s where s._class = ?1 ")
    public List<Section> find(Class _class);
}
