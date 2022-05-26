package com.example.app.model.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class studentRequest {

    private Long studentIdx;
    private String studentName;
    private String studentGender;
    private String studentGrade;

}
