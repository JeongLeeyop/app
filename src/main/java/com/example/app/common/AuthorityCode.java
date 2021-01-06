package com.example.app.common;

public enum AuthorityCode {
        // 계정 타입
        Teacher(0)
        , Admin(1)
        , SpecTeacher(2)
        , parent(3)
        , student(4);
private int value;
private AuthorityCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
