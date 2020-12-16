package com.example.app.model.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Season_SEQ_NO")
    @SequenceGenerator(sequenceName = "Season_SEQ_NO", name = "Season_SEQ_NO", allocationSize = 1)
    private long seasonIdx;
    @Column(nullable = false)
    private String seasonName;

    @ManyToOne
    @JoinColumn(name = "schoolIdx")
    private School school;
}
