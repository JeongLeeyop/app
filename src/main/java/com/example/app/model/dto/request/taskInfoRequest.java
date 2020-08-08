package com.example.app.model.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class taskInfoRequest {

    private String taskName;
    private Long gradeRatio;
    private int ckDefault;

}
