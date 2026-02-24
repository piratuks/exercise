package com.example.PriceEngineTest.pricing.engine;

import java.util.Optional;

public interface PricingRule {
	RuleCode code();

	Optional<AppliedDiscount> apply(PricingContext context);
}

