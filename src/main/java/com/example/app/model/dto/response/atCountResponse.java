package com.example.app.model.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class atCountResponse {

    private Long studentIdx;
    private String studentName;
    private Long presentCnt;
    private Long exTardyCnt;
    private Long tardyCnt;
    private Long familyLeaveCnt;
    private Long exAbsentCnt;
    private Long absentCnt;
    private Long earlyLeaveCnt;
    private String perfectAt;


}
