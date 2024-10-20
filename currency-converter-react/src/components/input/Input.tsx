import { ChangeEvent, FC, useEffect, useRef } from 'react';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const regex = /^\d*\.?\d{0,2}$/;

    if (value) {
      if (regex.test(value) || value === '') {
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
          handleChange(floatValue);
        }
      }
    }
  };

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
            value={formatNumber(selectedAmount)}
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
