package com.example.PriceEngineTest.pricing.api;

import com.example.PriceEngineTest.pricing.engine.RuleCode;

import java.math.BigDecimal;
import java.util.List;

public record PricingCalculateResponse(
		BigDecimal basePrice,
		BigDecimal discount,
		BigDecimal finalPrice,
		List<RuleCode> appliedRules
) {
}

