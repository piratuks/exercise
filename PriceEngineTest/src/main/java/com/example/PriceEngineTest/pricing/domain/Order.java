package com.example.PriceEngineTest.pricing.domain;

import java.util.List;

public record Order(User user, List<OrderItem> items) {
}

