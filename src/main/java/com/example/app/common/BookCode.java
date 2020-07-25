package com.example.app.common;

public enum BookCode{
        // 책 이벤트 타입
    None(0)
        , TotalBest(1)
        , MonthBest(2)
        , Theme1(3)
        , Theme2(4)
        , Theme3(5)
        , Theme4(6);

private int value;
private BookCode(int value) {
        this.value = value;
        }
public int getValue() {return value;}
        }
