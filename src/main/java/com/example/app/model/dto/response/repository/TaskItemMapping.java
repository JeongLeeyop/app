package com.example.app.model.dto.response.repository;

import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.TaskItemInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

public interface TaskItemMapping {

    Long getTaskItemIdx();

    BigDecimal getTaskScore();

    Long getStudentStudentIdx();

    String getStudentStudentName();

    Long getTaskItemInfoTaskItemInfoIdx();

    String getTaskItemInfoTaskItemName();



}