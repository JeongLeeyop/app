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
public class SectionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SectionItem_SEQ_NO")
    @SequenceGenerator(sequenceName = "SectionItem_SEQ_NO", name = "SectionItem_SEQ_NO", allocationSize = 1)
    private long sectionItemIdx;

    @ManyToOne
    @JoinColumn(name = "sectionIdx")
    private Section section;

    @ManyToOne
    @JoinColumn(name = "taskItemInfoIdx")
    private TaskItemInfo taskItemInfo;
}
