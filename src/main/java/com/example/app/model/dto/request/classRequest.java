package com.example.app.model.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class classRequest {

    private String className;
    private String sectionName;
    private Long classIdx;
}
