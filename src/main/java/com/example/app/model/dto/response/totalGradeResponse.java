package com.example.app.model.dto.response;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class totalGradeResponse {
    private Long studentIdx;
    private Long taskIdx;
    private Double grade;
    private Double finalGrade;
// 필요있나?
    private Long classIdx;
}
