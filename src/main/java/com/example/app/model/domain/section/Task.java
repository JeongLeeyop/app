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
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Task_SEQ_NO")
    @SequenceGenerator(sequenceName = "Task_SEQ_NO", name = "Task_SEQ_NO", allocationSize = 1)
    private long taskIdx;
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
