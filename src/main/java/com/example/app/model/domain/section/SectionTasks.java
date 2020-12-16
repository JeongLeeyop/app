package com.example.app.model.domain.section;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class SectionTasks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SectionTasks_SEQ_NO")
    @SequenceGenerator(sequenceName = "SectionTasks_SEQ_NO", name = "SectionTasks_SEQ_NO", allocationSize = 1)
    private long sectionTasksIdx;

    @ColumnDefault("10")
    private Double maxScore;

    @ManyToOne

    @JoinColumn(name = "sectionIdx")
    private Section section;

    @ManyToOne
    @JoinColumn(name = "taskIdx")
    private Task task;
}
