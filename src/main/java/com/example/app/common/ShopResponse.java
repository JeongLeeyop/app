package com.example.app.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShopResponse {

    public StatusCode statusCode = StatusCode.None;
    public String message; // 상황에 따라서 json

    public ShopResponse() {
    }

    public ShopResponse(StatusCode statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public ShopResponse(int result, String message) {
        this.statusCode = fromInteger(result);
        this.message = message;
    }

    public static StatusCode fromInteger(int x) {
        switch (x) {
            case 0:
                return StatusCode.None;
            case 1:
                return StatusCode.Success;
            case 2:
                return StatusCode.Fail;
        }
        return StatusCode.None;
    }

}
