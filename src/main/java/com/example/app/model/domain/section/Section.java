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
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Section_SEQ_NO")
    @SequenceGenerator(sequenceName = "Section_SEQ_NO", name = "Section_SEQ_NO", allocationSize = 1)
    private long sectionIdx;
    @Column(nullable = false)
    private String sectionName;

    @ManyToOne
    @JoinColumn(name = "classIdx")
    private Class _class;
}
