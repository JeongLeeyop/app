package com.example.app.model.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AuthClass {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "AuthClass_SEQ_NO")
    @SequenceGenerator(sequenceName = "AuthClass_SEQ_NO", name = "AuthClass_SEQ_NO", allocationSize = 1)
    private long authClassIdx;

    @ManyToOne
    @JoinColumn(name = "classIdx")
    private Class _class;

    @ManyToOne
    @JoinColumn(name = "userIdx")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "seasonIdx")
    private Season season;
}
