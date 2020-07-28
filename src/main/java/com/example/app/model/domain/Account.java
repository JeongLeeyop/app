package com.example.app.model.domain;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ACCOUNT_SEQ_NO")
    @SequenceGenerator(sequenceName = "ACCOUNT_SEQ_NO", name = "ACCOUNT_SEQ_NO", allocationSize = 1)
    private long userIdx;
    @Column(nullable = false)
    private String userEmail;
    @Column(nullable = false)
    private String userPw;
    @Column(nullable = false)
    private String userName;
    @Column
    private String curSemester;
    @Column
    private String graduation;
    @Column(nullable = false)
    private Timestamp createDate;

}
