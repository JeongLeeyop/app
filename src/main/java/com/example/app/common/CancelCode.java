package com.example.app.common;

public enum CancelCode {
    // 환불사유
    None(0), Buyer(1), Seller(2);


    private int value;

    private CancelCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static CancelCode fromInteger(int x) {
        switch (x) {
            case 1:
                return CancelCode.Buyer;
            case 2:
                return CancelCode.Seller;
        }
        return CancelCode.None;
    }
}
