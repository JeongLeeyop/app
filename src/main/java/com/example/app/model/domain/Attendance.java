package com.example.app.model.domain;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "Attendance_SEQ_NO")
    @SequenceGenerator(sequenceName = "Attendance_SEQ_NO", name = "Attendance_SEQ_NO", allocationSize = 1)
    private long atIdx;
    @Column(nullable = false)
    private Timestamp atDate;
    @Column(nullable = false)
    private int atState;
    @Column
    private String atMemo;

    @ManyToOne
    @JoinColumn(name = "studentIdx")
    private Student student;




}
