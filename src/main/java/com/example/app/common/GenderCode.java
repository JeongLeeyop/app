package com.example.app.common;

public enum GenderCode {
        // 출결 타입
    Male(0)
        , Female(1);
private int value;
private GenderCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
