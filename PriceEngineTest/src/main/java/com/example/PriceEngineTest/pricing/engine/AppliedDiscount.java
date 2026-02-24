package com.example.PriceEngineTest.pricing.engine;

import java.math.BigDecimal;

public record AppliedDiscount(RuleCode ruleCode, BigDecimal amount) {
}

