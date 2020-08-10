package com.example.app.model.dto.response;

import com.example.app.model.domain.section.TaskItem;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TaskChartResponse {

    private String studentName;
    private Long studentIdx;
    private List<com.example.app.model.domain.section.TaskItem> taskItem;

}
