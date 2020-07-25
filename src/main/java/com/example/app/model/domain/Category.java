package com.example.app.model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import oracle.jdbc.proxy.oracle$1jdbc$1replay$1driver$1NonTxnReplayableOthers$2java$1sql$1SQLOutput$$$Proxy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    private Long catgIdx;
    private String catgName;


//    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
//    private List<Book> list = new ArrayList<Book>();
}
