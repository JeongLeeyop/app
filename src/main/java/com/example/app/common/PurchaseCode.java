package com.example.app.common;


public enum PurchaseCode {
    None(0), Success(1)

    // 결제 관련
    , Payment_Success(10), Delivery_Ing(11), Delivery_Success(12), Purchase_Success(13)

    // 환불 관련
    , Cancel_Ing(20), Cancel_Success(21);


    private int value;

    private PurchaseCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static PurchaseCode fromInteger(int x) {
        switch (x) {
            case 10:
                return PurchaseCode.Payment_Success;
            case 13:
                return PurchaseCode.Purchase_Success;
            case 20:
                return PurchaseCode.Cancel_Ing;
            case 21:
                return PurchaseCode.Cancel_Success;
        }
        return PurchaseCode.None;
    }
};
