package com.example.app.model.domain.section;
import com.example.app.model.domain.Student;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TaskItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TaskItem_SEQ_NO")
    @SequenceGenerator(sequenceName = "TaskItem_SEQ_NO", name = "TaskItem_SEQ_NO", allocationSize = 1)
    private long taskItemIdx;
    @Column
    private long taskScore;

    @ManyToOne
    @JoinColumn(name = "sectionIdx")
    private Section section;

    @ManyToOne
    @JoinColumn(name = "StudentIdx")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "taskItemInfoIdx")
    private TaskItemInfo taskItemInfo;
}
