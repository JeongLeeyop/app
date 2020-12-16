package com.example.app.model.domain;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Student_seq_no")
    @SequenceGenerator(sequenceName = "Student_seq_no",name="Student_seq_no",allocationSize = 1)
    private Long studentIdx;
    @Column(nullable = false)
    private String studentName;
    @Column(nullable = false)
    private int studentGender;
    @Column(nullable = false)
    private int studentGrade;
    @Column
    private String studentMemo;

    @ManyToOne
    @JoinColumn(name = "userIdx", nullable = false)
    private Account account;
    @ManyToOne
    @JoinColumn(name = "seasonIdx")
    private Season season;


}
