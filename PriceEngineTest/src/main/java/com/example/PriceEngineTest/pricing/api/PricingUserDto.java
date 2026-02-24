package com.example.PriceEngineTest.pricing.api;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PricingUserDto(
		@NotNull Long id,
		boolean premium,
		@NotNull LocalDate registeredAt
) {
}

