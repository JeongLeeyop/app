    package com.example.app.model.dto.response.repository;

import com.example.app.model.domain.section.SectionTasks;

import java.math.BigDecimal;

public interface ScoreMapping {

    Long getScoreIdx();

    BigDecimal getScore();

    Long getSectionTasksSectionTasksIdx();

    //필요없음
//    Long getStudentStudentIdx();
    //필요없음
//    String getStudentStudentName();
    //필요없음
    //Long getAuthStudentAuthStudentIdx();
    //String getAuthStudentStudentStudentName();

    //classMembersIdx
    Long getClassMembersClassMembersIdx();
    //학생이름
    String getClassMembersAuthStudentStudentStudentName();

    //오잉?
    Long getTaskTaskIdx();

    String getTaskTaskItemName();



}