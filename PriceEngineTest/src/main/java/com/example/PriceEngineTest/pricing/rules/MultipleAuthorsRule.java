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
@Order(10)
public class MultipleAuthorsRule implements PricingRule {
	private static final int MIN_DISTINCT_AUTHORS = 3;
	private static final BigDecimal DISCOUNT_RATE = new BigDecimal("0.05");

	@Override
	public RuleCode code() {
		return RuleCode.MULTIPLE_AUTHORS;
	}

	@Override
	public Optional<AppliedDiscount> apply(PricingContext context) {
		if (context == null || context.order() == null || context.order().items() == null) {
			return Optional.empty();
		}

		long distinctAuthors = context.order().items().stream()
				.filter(i -> i != null && i.author() != null && !i.author().isBlank())
				.map(i -> i.author().trim())
				.distinct()
				.count();

		if (distinctAuthors < MIN_DISTINCT_AUTHORS) {
			return Optional.empty();
		}

		return Optional.of(new AppliedDiscount(code(), Money.percentOf(context.basePrice(), DISCOUNT_RATE)));
	}
}

