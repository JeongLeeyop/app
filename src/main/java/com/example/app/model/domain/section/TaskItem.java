package com.example.app.model.domain.section;
import com.example.app.model.domain.Student;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
//@DynamicInsert
//@DynamicUpdate
public class TaskItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TaskItem_SEQ_NO")
    @SequenceGenerator(sequenceName = "TaskItem_SEQ_NO", name = "TaskItem_SEQ_NO", allocationSize = 1)
    private long taskItemIdx;

    @Column(nullable=true)
    private BigDecimal taskScore;

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
