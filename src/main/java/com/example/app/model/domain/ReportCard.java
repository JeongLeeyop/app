package com.example.app.model.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ReportCard {

    //one to one 설정
    @Id
    private Long studentIdx;
    @Column
    private String repocardComment;
    @Column
    private String repocardChecklist;

}
