package com.example.app.model.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AuthStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "AuthStudent_SEQ_NO")
    @SequenceGenerator(sequenceName = "AuthStudent_SEQ_NO", name = "AuthStudent_SEQ_NO", allocationSize = 1)
    private long authStudentIdx;

    @ManyToOne
    @JoinColumn(name = "studentIdx")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "userIdx")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "seasonIdx")
    private Season season;
}
