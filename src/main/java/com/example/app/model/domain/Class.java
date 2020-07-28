package com.example.app.model.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Class_SEQ_NO")
    @SequenceGenerator(sequenceName = "Class_SEQ_NO", name = "Class_SEQ_NO", allocationSize = 1)
    private long classIdx;
    @Column(nullable = false)
    private String className;
    @Column(nullable = false)
    private String classSectionName;
    @Column
    private String classGradeRatio;
    //스트링?
    @Column
    private String classMemo;

    @ManyToOne
    @JoinColumn(name = "userIdx")
    private Account account;

}
