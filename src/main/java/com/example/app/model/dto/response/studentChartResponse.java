package com.example.app.model.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class studentChartResponse {

    private Long studentIdx;
    private String studentName;
    private String studentAttendance;
    private List<String> studentGrade;

}
