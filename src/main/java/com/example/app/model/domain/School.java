package com.example.app.model.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "School_SEQ_NO")
    @SequenceGenerator(sequenceName = "School_SEQ_NO", name = "School_SEQ_NO", allocationSize = 1)
    private long schoolIdx;
    @Column(nullable = false)
    private String schoolName;
    @Column
    private String schoolInfo;
}
