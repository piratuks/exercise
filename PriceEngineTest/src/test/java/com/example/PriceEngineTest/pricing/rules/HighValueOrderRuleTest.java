package com.example.PriceEngineTest.pricing.rules;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.User;
import com.example.PriceEngineTest.pricing.engine.PricingContext;
import com.example.PriceEngineTest.pricing.money.Money;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class HighValueOrderRuleTest {
	private final HighValueOrderRule rule = new HighValueOrderRule();

	@Test
	void doesNotApply_whenBaseIsEqualToThreshold() {
		Order order = new Order(new User(1L, false, LocalDate.parse("2023-01-10")), List.of());
		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("150.00")));
		assertThat(rule.apply(ctx)).isEmpty();
	}

	@Test
	void appliesTenPercent_whenBaseIsGreaterThanThreshold() {
		Order order = new Order(new User(1L, false, LocalDate.parse("2023-01-10")), List.of());
		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("150.01")));
		var discount = rule.apply(ctx).orElseThrow();
		assertThat(discount.amount()).isEqualByComparingTo("15.00");
	}
}

