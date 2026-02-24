package com.example.PriceEngineTest.pricing.rules;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.PriceEngineTest.pricing.engine.AppliedDiscount;
import com.example.PriceEngineTest.pricing.engine.PricingContext;
import com.example.PriceEngineTest.pricing.engine.PricingRule;
import com.example.PriceEngineTest.pricing.engine.RuleCode;
import com.example.PriceEngineTest.pricing.money.Money;

@Component
@Order(30)
public class PremiumUserRule implements PricingRule {
	private static final BigDecimal DISCOUNT_RATE = new BigDecimal("0.10");

	@Override
	public RuleCode code() {
		return RuleCode.PREMIUM_USER;
	}

	@Override
	public Optional<AppliedDiscount> apply(PricingContext context) {
		if (context == null || context.order() == null || context.order().user() == null) {
			return Optional.empty();
		}

		if (!context.order().user().premium()) {
			return Optional.empty();
		}

		return Optional.of(new AppliedDiscount(code(), Money.percentOf(context.basePrice(), DISCOUNT_RATE)));
	}
}

