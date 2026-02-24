package com.example.PriceEngineTest.pricing.engine;

import com.example.PriceEngineTest.pricing.domain.Order;

import java.math.BigDecimal;

public record PricingContext(Order order, BigDecimal basePrice) {
}

