package com.example.PriceEngineTest.pricing.domain;

import java.time.LocalDate;

public record User(Long id, boolean premium, LocalDate registeredAt) {
}

