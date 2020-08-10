package com.example.app.model.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class taskScoreResponse {

    private Long studentIdx;
    private Long taskInfoIdx;
    private Long score;

}
