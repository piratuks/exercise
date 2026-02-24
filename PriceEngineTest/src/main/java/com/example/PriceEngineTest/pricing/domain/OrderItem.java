package com.example.PriceEngineTest.pricing.domain;

import java.math.BigDecimal;

public record OrderItem(Long bookId, String author, BigDecimal price, int quantity) {
}

