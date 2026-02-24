# Dynamic Pricing Engine (Spring Boot)

## Project

Project barebone generated with [https://start.spring.io/](https://start.spring.io/)

## API

### `POST /pricing/calculate`

Example request:

```json
{
  "user": {
    "id": 1,
    "premium": true,
    "registeredAt": "2023-01-10"
  },
  "items": [
    { "bookId": 10, "author": "Author A", "price": 40, "quantity": 1 },
    { "bookId": 11, "author": "Author B", "price": 60, "quantity": 1 },
    { "bookId": 12, "author": "Author C", "price": 60, "quantity": 1 }
  ]
}
```

Example response:

```json
{
  "basePrice": 160,
  "discount": 40,
  "finalPrice": 120,
  "appliedRules": [
    "MULTIPLE_AUTHORS",
    "HIGH_VALUE_ORDER",
    "PREMIUM_USER"
  ]
}
```

## Business rules implemented

- `MULTIPLE_AUTHORS`: if the order contains books from **3 or more distinct authors**, apply **5%** discount.
- `HIGH_VALUE_ORDER`: if the base price is **> 150 EUR**, apply **10%** discount.
- `PREMIUM_USER`: if the user is premium, apply **10%** discount.

## Discount interaction logic (important design decision)

Discounts **stack additively** and are **computed on the base price** (not sequentially on a running subtotal):

- Each rule is evaluated independently against the same `PricingContext` (order + base price).
- The engine sums all rule discount amounts into `discount`.
- Safety: total discount is capped at `basePrice` so `finalPrice` never becomes negative.

Why:

- Order-independent (commutative) and easy to reason about.
- Rules stay fully decoupled (adding a new rule doesn't require changing existing rules).
- Matches the assignment's example totals when two rules apply (`MULTIPLE_AUTHORS` and `PREMIUM_USER`).

## Extensibility

Add a new pricing rule by implementing `PricingRule` and registering it as a Spring bean (e.g. `@Component`).
The engine auto-discovers rules via Spring injection (`List<PricingRule>`).

## Run

```bash
cd PriceEngineTest
./mvnw spring-boot:run
```

## Test

```bash
cd PriceEngineTest
./mvnw test
```
