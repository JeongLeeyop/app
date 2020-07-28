package com.example.app.model.domain.section;
import com.example.app.model.domain.Class;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TaskItemName {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TaskItemName_SEQ_NO")
    @SequenceGenerator(sequenceName = "TaskItemName_SEQ_NO", name = "TaskItemName_SEQ_NO", allocationSize = 1)
    private long taskItemNameIdx;
    @Column(nullable = false)
    private String taskItemName;

    @ManyToOne
    @JoinColumn(name = "classIdx")
    private Class _class;

}
