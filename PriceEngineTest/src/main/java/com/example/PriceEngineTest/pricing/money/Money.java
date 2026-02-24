package com.example.PriceEngineTest.pricing.money;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class Money {
	private Money() {
	}

	public static BigDecimal zero() {
		return BigDecimal.ZERO;
	}

	public static BigDecimal eur(BigDecimal amount) {
		if (amount == null) {
			return zero();
		}
		return amount.setScale(2, RoundingMode.HALF_UP);
	}

	public static BigDecimal percentOf(BigDecimal base, BigDecimal rate) {
		if (base == null || rate == null) {
			return zero();
		}
		return eur(base.multiply(rate));
	}

	public static BigDecimal min(BigDecimal a, BigDecimal b) {
		if (a == null) {
			return b;
		}
		if (b == null) {
			return a;
		}
		return a.min(b);
	}
}

