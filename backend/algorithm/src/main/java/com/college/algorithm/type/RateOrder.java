package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum RateOrder {
    high("h"),
    low("l");

    private final String rate;

    RateOrder(String rate) {
        this.rate = rate;
    }
}
