package com.example.PriceEngineTest.pricing.engine;

import java.math.BigDecimal;
import java.util.List;

public record PricingResult(
		BigDecimal basePrice,
		BigDecimal discount,
		BigDecimal finalPrice,
		List<RuleCode> appliedRules
) {
}

