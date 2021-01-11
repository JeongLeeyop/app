    package com.example.app.model.dto.response.repository;

import java.math.BigDecimal;

    public interface CMTaskScoreMapping {

        BigDecimal getScore();
        BigDecimal getMaxScore();
        Double getAvg();

    }