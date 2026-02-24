package com.example.PriceEngineTest.pricing.engine;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.OrderItem;
import com.example.PriceEngineTest.pricing.domain.User;
import com.example.PriceEngineTest.pricing.rules.HighValueOrderRule;
import com.example.PriceEngineTest.pricing.rules.MultipleAuthorsRule;
import com.example.PriceEngineTest.pricing.rules.PremiumUserRule;

class DefaultPricingEngineTest {
	@Test
	void returnsZeros_forEmptyOrder() {
		PricingEngine engine = new DefaultPricingEngine(List.of(
				new MultipleAuthorsRule(),
				new HighValueOrderRule(),
				new PremiumUserRule()
		));

		PricingResult result = engine.calculatePrice(new Order(new User(1L, false, LocalDate.parse("2023-01-10")), List.of()));

		assertThat(result.basePrice()).isEqualByComparingTo("0.00");
		assertThat(result.discount()).isEqualByComparingTo("0.00");
		assertThat(result.finalPrice()).isEqualByComparingTo("0.00");
		assertThat(result.appliedRules()).isEmpty();
	}

	@Test
	void appliesStackedDiscounts_additivelyOnBasePrice() {
		PricingEngine engine = new DefaultPricingEngine(List.of(
				new MultipleAuthorsRule(),
				new HighValueOrderRule(),
				new PremiumUserRule()
		));

		Order order = new Order(
				new User(1L, true, LocalDate.parse("2023-01-10")),
				List.of(
						new OrderItem(10L, "Author A", new BigDecimal("40.00"), 1),
						new OrderItem(11L, "Author B", new BigDecimal("60.00"), 1),
						new OrderItem(12L, "Author C", new BigDecimal("60.00"), 1)
				)
		);

		PricingResult result = engine.calculatePrice(order);

		assertThat(result.basePrice()).isEqualByComparingTo("160.00");
		assertThat(result.discount()).isEqualByComparingTo("40.00");
		assertThat(result.finalPrice()).isEqualByComparingTo("120.00");
		assertThat(result.appliedRules()).containsExactly(
				RuleCode.MULTIPLE_AUTHORS,
				RuleCode.HIGH_VALUE_ORDER,
				RuleCode.PREMIUM_USER
		);
	}

	@Test
	void capsDiscountAtBasePrice() {
		PricingRule extremeRule = new PricingRule() {
			@Override
			public RuleCode code() {
				return RuleCode.HIGH_VALUE_ORDER;
			}

			@Override
			public Optional<AppliedDiscount> apply(PricingContext context) {
				return Optional.of(new AppliedDiscount(code(), new BigDecimal("999999.99")));
			}
		};

		PricingEngine engine = new DefaultPricingEngine(List.of(extremeRule));

		Order order = new Order(
				new User(1L, false, LocalDate.parse("2023-01-10")),
				List.of(new OrderItem(10L, "Author A", new BigDecimal("10.00"), 1))
		);

		PricingResult result = engine.calculatePrice(order);
		assertThat(result.basePrice()).isEqualByComparingTo("10.00");
		assertThat(result.discount()).isEqualByComparingTo("10.00");
		assertThat(result.finalPrice()).isEqualByComparingTo("0.00");
	}
}

