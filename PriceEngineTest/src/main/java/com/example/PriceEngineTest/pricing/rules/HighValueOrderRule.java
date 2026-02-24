package com.example.PriceEngineTest.pricing.rules;

import com.example.PriceEngineTest.pricing.engine.AppliedDiscount;
import com.example.PriceEngineTest.pricing.engine.PricingContext;
import com.example.PriceEngineTest.pricing.engine.PricingRule;
import com.example.PriceEngineTest.pricing.engine.RuleCode;
import com.example.PriceEngineTest.pricing.money.Money;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@Order(20)
public class HighValueOrderRule implements PricingRule {
	private static final BigDecimal THRESHOLD_EUR = new BigDecimal("150.00");
	private static final BigDecimal DISCOUNT_RATE = new BigDecimal("0.10");

	@Override
	public RuleCode code() {
		return RuleCode.HIGH_VALUE_ORDER;
	}

	@Override
	public Optional<AppliedDiscount> apply(PricingContext context) {
		if (context == null || context.basePrice() == null) {
			return Optional.empty();
		}

		if (context.basePrice().compareTo(THRESHOLD_EUR) <= 0) {
			return Optional.empty();
		}

		return Optional.of(new AppliedDiscount(code(), Money.percentOf(context.basePrice(), DISCOUNT_RATE)));
	}
}

