package com.example.PriceEngineTest.pricing.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PricingCalculateRequest(
		@NotNull @Valid PricingUserDto user,
		@NotNull @Valid List<PricingItemDto> items
) {
}

