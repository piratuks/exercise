import { renderHook } from '@testing-library/react';
import { defaultAmount, defaultFrom, defaultTo } from 'app/constant';
import { Currency, CurrencyKey } from 'app/currency';
import { useConverter } from 'hooks/useConverter';
import { act } from 'react';

describe('useConverter', () => {
  const mockHandleConvertCallBack = jest.fn();

  const defaultCurrency: Currency = { label: 'EUR - Euro (€)', value: CurrencyKey.eur, limit: 5000 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, null, null));

    expect(result.current.from).toEqual(defaultFrom);
    expect(result.current.to).toEqual(defaultTo);
    expect(result.current.amountF).toEqual(defaultAmount);
    expect(result.current.amountT).toBeNull();
  });

  it('should call handleConvertCallBack when amounts change', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, null, null));

    act(() => {
      result.current.handleFromAmountChange(5000);
    });

    expect(result.current.amountF).toBe(5000);
  });

  it('should update amounts correctly when input is changed', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, null, null));

    act(() => {
      result.current.handleFromAmountChange(5000);
    });

    expect(result.current.amountF).toBe(5000);
    expect(result.current.amountT).toBeNull();
  });

  it('should switch from and to currencies', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, null, null));

    act(() => {
      result.current.handleFromChange(defaultCurrency);
    });

    expect(result.current.from).toEqual(defaultCurrency);

    act(() => {
      result.current.switchValues();
    });

    expect(result.current.from).toEqual(defaultTo);
    expect(result.current.to).toEqual(defaultCurrency);
  });

  it('should handle currency changes correctly', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, null, null));

    act(() => {
      result.current.handleFromChange(defaultCurrency);
    });

    expect(result.current.from).toEqual(defaultCurrency);
  });

  it('should handle conversion clicks', () => {
    const { result } = renderHook(() => useConverter(mockHandleConvertCallBack, 5000, null));

    act(() => {
      result.current.handleConvertClick();
    });

    expect(result.current.amountF).toBe(5000);
    expect(mockHandleConvertCallBack).toHaveBeenCalledWith(defaultFrom.value, defaultTo.value, 5000);
  });
});
