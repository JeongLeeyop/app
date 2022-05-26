    package com.example.app.model.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

    @Getter
    @Setter
    @ToString
    public class CMTaskScoreResponse {

        String SectionName;
        BigDecimal Score;
        BigDecimal MaxScore;
        Double Avg;

    }

