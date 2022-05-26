package com.example.app.common;

public enum OrderByCode {
        // 출결 타입
    Index(0),
    ByGrade(1),
    ByName(2);

private int value;
private OrderByCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
