import { faLeftRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CurrencyKey } from 'app/currency';
import { Dropdown } from 'components/dropdown/Dropdown';
import { Input } from 'components/input/Input';
import { useConverter } from 'hooks/useConverter';
import { FC, useState } from 'react';
import { formatNumber } from 'utils/functionUtils';
import './converter.css';

interface Props {
  handleConvertCallBack?: (from: CurrencyKey, to: CurrencyKey, amount: number) => void;
  convertInitiated: boolean;
  isLoading: boolean;
  fromAmount: number | null;
  toAmount: number | null;
}

export const Converter: FC<Props> = ({
  handleConvertCallBack = () => {},
  convertInitiated,
  fromAmount,
  toAmount,
  isLoading
}) => {
  const {
    from,
    to,
    amountF,
    amountT,
    handleFromChange,
    handleToChange,
    switchValues,
    handleConvertClick,
    handleFromAmountChange,
    handleToAmountChange
  } = useConverter(handleConvertCallBack, fromAmount, toAmount, convertInitiated);
  const [focusedInput, setFocusedInput] = useState<'from' | 'to' | null>(null);

  const handleFocusFromAmount = () => {
    setFocusedInput('from');
  };

  const handleFocusToAmount = () => {
    setFocusedInput('to');
  };

  return (
    <>
      <div className="container-parent">
        <div className="container-fluid">
          <div className="grid">
            <div className="row">
              <div className="dropdownBlock">
                <Dropdown
                  label="FROM:"
                  handleChange={handleFromChange}
                  placeholder="Select a currency (From)"
                  selectedCurrency={from}
                ></Dropdown>
              </div>
              <div className="spacer"></div>
              <div className="switch" onClick={switchValues}>
                <FontAwesomeIcon icon={faLeftRight} />
              </div>
              <div className="spacer"></div>
              <div className="dropdownBlock">
                <Dropdown
                  label="TO:"
                  handleChange={handleToChange}
                  placeholder="Select a currency (To)"
                  selectedCurrency={to}
                ></Dropdown>
              </div>
            </div>
            <div className="row">
              <div className={`${!convertInitiated ? 'inputBlockFullW' : 'inputBlock'}`}>
                <Input
                  label="AMOUNT:"
                  handleChange={handleFromAmountChange}
                  placeholder="Input amount"
                  selectedAmount={amountF}
                  currencyKey={from.value}
                  max={from.limit}
                  isLoading={isLoading}
                  isFocused={focusedInput === 'from'}
                  handleFocus={handleFocusFromAmount}
                ></Input>
              </div>
              {convertInitiated && <div className="spacer"></div>}
              {convertInitiated && (
                <div className={`inputBlock`}>
                  <Input
                    label="CONVERTED TO:"
                    handleChange={handleToAmountChange}
                    placeholder="Input converted amount"
                    selectedAmount={amountT}
                    currencyKey={to.value}
                    isLoading={isLoading}
                    isFocused={focusedInput === 'to'}
                    handleFocus={handleFocusToAmount}
                  ></Input>
                </div>
              )}
            </div>
            <div className="row">
              {!convertInitiated && (
                <button className="btn" onClick={handleConvertClick}>
                  Convert
                </button>
              )}
              {convertInitiated && (
                <div className="info">
                  <ul className="custom-list">
                    <li>
                      {formatNumber(amountF)} {from.value.toUpperCase()} = {formatNumber(amountT)}{' '}
                      {to.value.toUpperCase()}
                    </li>
                  </ul>
                  <p>All figures are live mid-market rates, which are for informational purposes only.</p>
                  <p>To see the rates for money transfer, please select sending money option.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
