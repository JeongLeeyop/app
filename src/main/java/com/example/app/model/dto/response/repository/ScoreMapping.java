package com.example.app.model.dto.response.repository;

import java.math.BigDecimal;

public interface ScoreMapping {

    Long getScoreIdx();

    BigDecimal getScore();

    //필요없음
    Long getStudentStudentIdx();
    //필요없음
    String getStudentStudentName();

    Long getAuthStudentAuthStudentIdx();

    String getAuthStudentStudentStudentName();

    //오잉?
    Long getTaskTaskIdx();

    String getTaskTaskItemName();



}