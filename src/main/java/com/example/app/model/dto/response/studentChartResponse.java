package com.example.app.model.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class studentChartResponse {

    private String studentName;
    private Long studentIdx;
    private String studentAttendance;
    private List<String> studentGrade;

}
