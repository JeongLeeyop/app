package com.example.app.model.domain.section;
import com.example.app.model.domain.Class;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class ClassDefaultTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ClassDefaultTask_SEQ_NO")
    @SequenceGenerator(sequenceName = "ClassDefaultTask_SEQ_NO", name = "ClassDefaultTask_SEQ_NO", allocationSize = 1)
    private long classDefaultTaskIdx;

    @ManyToOne
    @JoinColumn(name = "taskItemInfoIdx")
    private TaskItemInfo TaskItemInfo;

    @ManyToOne
    @JoinColumn(name = "classIdx")
    private Class _class;
}
