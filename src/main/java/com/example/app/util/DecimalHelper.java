package com.example.app.util;

import java.math.BigDecimal;
import java.util.List;

public class DecimalHelper {

    public static BigDecimal sum(List<BigDecimal> list) {
        BigDecimal decimal = new BigDecimal(0);

        for (BigDecimal d : list) {
            decimal.add(d);
        }

        return decimal;
    }

    public static BigDecimal multiply(BigDecimal number, int count) {
        return number.multiply(new BigDecimal(count));
    }

}
