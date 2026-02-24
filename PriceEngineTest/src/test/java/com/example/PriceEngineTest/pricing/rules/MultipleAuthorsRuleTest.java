package com.example.PriceEngineTest.pricing.rules;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.OrderItem;
import com.example.PriceEngineTest.pricing.domain.User;
import com.example.PriceEngineTest.pricing.engine.PricingContext;
import com.example.PriceEngineTest.pricing.money.Money;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class MultipleAuthorsRuleTest {
	private final MultipleAuthorsRule rule = new MultipleAuthorsRule();

	@Test
	void doesNotApply_whenLessThanThreeDistinctAuthors() {
		Order order = new Order(
				new User(1L, false, LocalDate.parse("2023-01-10")),
				List.of(
						new OrderItem(10L, "Author A", new BigDecimal("40.00"), 1),
						new OrderItem(11L, "Author B", new BigDecimal("60.00"), 1)
				)
		);

		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("100.00")));
		assertThat(rule.apply(ctx)).isEmpty();
	}

	@Test
	void appliesFivePercent_whenThreeOrMoreDistinctAuthors() {
		Order order = new Order(
				new User(1L, false, LocalDate.parse("2023-01-10")),
				List.of(
						new OrderItem(10L, "Author A", new BigDecimal("10.00"), 1),
						new OrderItem(11L, "Author B", new BigDecimal("10.00"), 1),
						new OrderItem(12L, "Author C", new BigDecimal("10.00"), 1)
				)
		);

		PricingContext ctx = new PricingContext(order, Money.eur(new BigDecimal("200.00")));
		var discount = rule.apply(ctx).orElseThrow();
		assertThat(discount.amount()).isEqualByComparingTo("10.00");
	}
}

