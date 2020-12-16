package com.example.app.model.domain;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class ClassMembers {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ClassMembers_SEQ_NO")
    @SequenceGenerator(sequenceName = "ClassMembers_SEQ_NO", name = "ClassMembers_SEQ_NO", allocationSize = 1)
    private long classMembersIdx;

    @ManyToOne
    @JoinColumn(name = "authClassIdx")
    private AuthClass authClass;

    @ManyToOne
    @JoinColumn(name = "authStudentIdx")
    private AuthStudent authStudent;

}
