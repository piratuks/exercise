package com.example.PriceEngineTest.pricing.api;

import com.example.PriceEngineTest.pricing.domain.Order;
import com.example.PriceEngineTest.pricing.domain.OrderItem;
import com.example.PriceEngineTest.pricing.domain.User;
import com.example.PriceEngineTest.pricing.engine.PricingEngine;
import com.example.PriceEngineTest.pricing.engine.PricingResult;
import com.example.PriceEngineTest.pricing.money.Money;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pricing")
public class PricingController {
	private final PricingEngine pricingEngine;

	public PricingController(PricingEngine pricingEngine) {
		this.pricingEngine = pricingEngine;
	}

	@PostMapping("/calculate")
	public PricingCalculateResponse calculate(@Valid @RequestBody PricingCalculateRequest request) {
		Order order = toDomain(request);
		PricingResult result = pricingEngine.calculatePrice(order);

		return new PricingCalculateResponse(
				result.basePrice().stripTrailingZeros(),
				result.discount().stripTrailingZeros(),
				result.finalPrice().stripTrailingZeros(),
				result.appliedRules()
		);
	}

	private static Order toDomain(PricingCalculateRequest request) {
		User user = new User(
				request.user().id(),
				request.user().premium(),
				request.user().registeredAt()
		);

		List<OrderItem> items = request.items().stream()
				.map(i -> new OrderItem(i.bookId(), i.author(), Money.eur(i.price()), i.quantity()))
				.toList();

		return new Order(user, items);
	}
}

