package com.example.PriceEngineTest.pricing.rules;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.User;
import com.example.PriceEngineTest.pricing.engine.PricingContext;
import com.example.PriceEngineTest.pricing.money.Money;

class PremiumUserRuleTest {
	private final PremiumUserRule rule = new PremiumUserRule();

	@Test
	void doesNotApply_forNonPremiumUser() {
		Order order = new Order(new User(1L, false, LocalDate.parse("2023-01-10")), List.of());
		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("200.00")));
		assertThat(rule.apply(ctx)).isEmpty();
	}

	@Test
	void appliesFivePercent_forPremiumUser() {
		Order order = new Order(new User(1L, true, LocalDate.parse("2023-01-10")), List.of());
		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("200.00")));
		var discount = rule.apply(ctx).orElseThrow();
		assertThat(discount.amount()).isEqualByComparingTo("20.00");
	}
}

