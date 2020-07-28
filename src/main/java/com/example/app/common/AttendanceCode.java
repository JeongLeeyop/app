package com.example.app.common;

public enum AttendanceCode {
        // 출결 타입
    None(0)
        , ExTardy(1)
        , Tardy(2)
        , FamilyLeave(3)
        , ExAbsent(4)
        , Absent(5)
        , EarlyLeave(6);

private int value;
private AttendanceCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
