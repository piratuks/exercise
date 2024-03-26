import { randomNumber } from './functions';

describe('Random number generation', () => {
  const originalTick = 15;

  it('should generate number between 1 and 15', () => {
    const step = originalTick;
    const result = randomNumber(step, originalTick);
    expect(result).toBeLessThanOrEqual(15);
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it(`should generate number between 16 and 30'`, () => {
    const step = originalTick * 2;
    const result = randomNumber(step, originalTick);
    expect(result).toBeLessThanOrEqual(30);
    expect(result).toBeGreaterThanOrEqual(16);
  });

  it(`should generate number between 31 and 45'`, () => {
    const step = originalTick * 3;
    const result = randomNumber(step, originalTick);
    expect(result).toBeLessThanOrEqual(45);
    expect(result).toBeGreaterThanOrEqual(31);
  });

  it(`should generate number between 46 and 60'`, () => {
    const step = originalTick * 4;
    const result = randomNumber(step, originalTick);
    expect(result).toBeLessThanOrEqual(60);
    expect(result).toBeGreaterThanOrEqual(46);
  });

  it(`should generate number between 61 and 75'`, () => {
    const step = originalTick * 5;
    const result = randomNumber(step, originalTick);
    expect(result).toBeLessThanOrEqual(75);
    expect(result).toBeGreaterThanOrEqual(61);
  });
});
