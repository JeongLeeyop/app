package com.example.app.common;

public enum AutoSaveCode {
        // 출결 타입
    False(0),
    True(1);

private int value;
private AutoSaveCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
