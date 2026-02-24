package com.example.PriceEngineTest.pricing.engine;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.OrderItem;
import com.example.PriceEngineTest.pricing.money.Money;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DefaultPricingEngine implements PricingEngine {
	private final List<PricingRule> rules;

	public DefaultPricingEngine(List<PricingRule> rules) {
		this.rules = rules == null ? List.of() : List.copyOf(rules);
	}

	@Override
	public PricingResult calculatePrice(Order order) {
		if (order == null || order.items() == null || order.items().isEmpty()) {
			return new PricingResult(Money.eur(BigDecimal.ZERO), Money.eur(BigDecimal.ZERO), Money.eur(BigDecimal.ZERO), List.of());
		}

		BigDecimal basePrice = Money.eur(order.items().stream()
				.map(this::itemTotal)
				.reduce(BigDecimal.ZERO, BigDecimal::add));

		PricingContext context = new PricingContext(order, basePrice);

		List<AppliedDiscount> appliedDiscounts = new ArrayList<>();
		for (PricingRule rule : rules) {
			rule.apply(context).ifPresent(appliedDiscounts::add);
		}

		BigDecimal discount = Money.eur(Money.min(
				appliedDiscounts.stream()
						.map(AppliedDiscount::amount)
						.filter(a -> a != null && a.signum() > 0)
						.reduce(BigDecimal.ZERO, BigDecimal::add),
				basePrice
		));

		List<RuleCode> appliedRuleCodes = appliedDiscounts.stream()
				.filter(d -> d.amount() != null && d.amount().signum() > 0)
				.map(AppliedDiscount::ruleCode)
				.toList();

		BigDecimal finalPrice = Money.eur(basePrice.subtract(discount));

		return new PricingResult(basePrice, discount, finalPrice, Collections.unmodifiableList(appliedRuleCodes));
	}

	private BigDecimal itemTotal(OrderItem item) {
		if (item == null || item.price() == null) {
			return BigDecimal.ZERO;
		}
		return item.price().multiply(BigDecimal.valueOf(item.quantity()));
	}
}

