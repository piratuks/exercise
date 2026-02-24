package com.example.PriceEngineTest.pricing.api;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record PricingItemDto(
		@NotNull Long bookId,
		@NotBlank String author,
		@NotNull @PositiveOrZero BigDecimal price,
		@Min(0) int quantity
) {
}

