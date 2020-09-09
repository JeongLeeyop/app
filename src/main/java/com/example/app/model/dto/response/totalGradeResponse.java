package com.example.app.model.dto.response;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class totalGradeResponse {
    private Long studentIdx;
    private Long taskItemInfoIdx;
    private Double grade;
    private Double finalGrade;
}
