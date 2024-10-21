import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { CurrencyKey } from 'app/currency';
import { formatNumber } from 'utils/functionUtils';
import './input.css';

interface InputProps {
  label: string;
  placeholder: string;
  handleChange?: (newValue: number) => void;
  handleFocus?: () => void;
  selectedAmount: number | null;
  currencyKey: CurrencyKey;
  max?: number;
  isLoading?: boolean;
  isFocused?: boolean;
}
export const Input: FC<InputProps> = ({
  label,
  placeholder,
  selectedAmount,
  handleChange = () => {},
  handleFocus = () => {},
  currencyKey,
  max,
  isLoading = false,
  isFocused = false
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const isPropUpdateRef = useRef(false);
  const isDebounced = useRef(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const regex = /^\d*\.?\d{0,2}$/;

    if (value) {
      if (regex.test(value) || value === '') {
        setInputValue(value);
        isPropUpdateRef.current = false;
        isDebounced.current = false;
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setInputValue(formatNumber(selectedAmount));
      isPropUpdateRef.current = true;
    }
  }, [selectedAmount, isLoading]);

  useEffect(() => {
    if (isPropUpdateRef.current) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      if (inputValue && !isDebounced.current) {
        const floatValue = parseFloat(inputValue);
        if (!isNaN(floatValue)) {
          handleChange(floatValue);
          setInputValue(formatNumber(floatValue));
          isDebounced.current = true;
        }
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, handleChange]);

  useEffect(() => {
    if (!isLoading && isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused, isLoading]);

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-with-suffix">
        {isLoading && (
          <>
            <div className="loading">
              <div className="loadings">
                <div className="line hw1"></div>
              </div>
            </div>
          </>
        )}
        {!isLoading && (
          <input
            ref={inputRef}
            onFocus={handleFocus}
            placeholder={placeholder}
            value={inputValue}
            pattern="^\d*\.?\d{0,2}$"
            type="number"
            step="0.01"
            min="0.01"
            max={max}
            onChange={handleInputChange}
          />
        )}
        <span className="currency-suffix">{currencyKey.toUpperCase()}</span>
      </div>
    </div>
  );
};
