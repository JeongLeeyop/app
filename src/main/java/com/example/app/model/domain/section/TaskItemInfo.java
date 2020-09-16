package com.example.app.model.domain.section;
import com.example.app.model.domain.Class;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class TaskItemInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TaskItemName_SEQ_NO")
    @SequenceGenerator(sequenceName = "TaskItemName_SEQ_NO", name = "TaskItemName_SEQ_NO", allocationSize = 1)
    private long taskItemInfoIdx;
    @Column(nullable = false)
    private String taskItemName;
    @Column
    private long taskGradeRatio;
    @Column
    @ColumnDefault("10")
    private Double maxScore;

    @ManyToOne
    @JoinColumn(name = "classIdx")
    private Class _class;

}
