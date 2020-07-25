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
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ADMIN_SEQ_NO")
    @SequenceGenerator(sequenceName = "ADMIN_SEQ_NO", name = "ADMIN_SEQ_NO", allocationSize = 1)
    private int adminIdx;

    private String adminId;
    private String adminPassword;
    private String adminRoleName;
    private int adminEnabled;

    public Admin(String adminId, String adminPassword) {
        this.adminId = adminId;
        this.adminPassword = adminPassword;
    }


}
