package com.example.app.model.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "STAT_SEQ_NO")
    @SequenceGenerator(sequenceName = "STAT_SEQ_NO", name = "STAT_SEQ_NO", allocationSize = 1)
    private int statIdx;
    private int salePrice;
    private String saleDate;
    private long userCount;

    public Statistics(int salePrice, String saleDate, long userCount) {
        super();
        this.salePrice = salePrice;
        this.saleDate = saleDate;
        this.userCount = userCount;
    }

}
