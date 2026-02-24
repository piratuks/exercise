package com.example.PriceEngineTest.pricing.engine;

import com.example.PriceEngineTest.pricing.domain.Order;

public interface PricingEngine {
	PricingResult calculatePrice(Order order);
}

