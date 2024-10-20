import { currency, Currency } from 'app/currency';
import React from 'react';
import Select, {
  components,
  CSSObjectWithLabel,
  GroupBase,
  MultiValue,
  OptionProps,
  SingleValue,
  SingleValueProps,
  StylesConfig
} from 'react-select';

import 'currency-flags/dist/currency-flags.min.css';
import './dropdown.css';

const { Option } = components;

interface DropdownProps {
  label: string;
  placeholder: string;
  handleChange?: (newValue: Currency) => void;
  selectedCurrency: Currency;
}

const customStyles: StylesConfig<Currency, boolean, GroupBase<Currency>> = {
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    cursor: 'pointer',
    borderBottom: '1px solid rgba(204, 204, 204, 0.2)',
    backgroundColor: state.isSelected ? 'rgba(23, 177, 105, 0.5)' : '',
    color: 'black',
    '&:active': {
      backgroundColor: 'rgba(23, 177, 105, 0.5)'
    },
    '&:focus': {
      backgroundColor: 'rgba(23, 177, 105, 0.5)'
    },
    '&:hover': {
      backgroundColor: 'rgba(23, 177, 105, 0.2)'
    }
  }),
  control: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    cursor: 'pointer',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    outline: 'none',
    boxShadow: 'none',
    borderBottom: state.isFocused ? '2px solid #17b169' : '',
    fontWeight: '600',
    '&:focus': {
      borderBottom: '2px solid #17b169'
    },
    '&:hover': {
      borderBottom: '2px solid #17b169'
    }
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width: '0'
  })
};

const OptionComponent: React.FC<OptionProps<Currency>> = props => {
  return (
    <Option {...props}>
      <span className={`currency-flag currency-flag-${props.data.value}`} /> {props.data.value.toUpperCase()}
    </Option>
  );
};

const SingleValueComponent = ({ ...props }: SingleValueProps<Currency>) => (
  <components.SingleValue {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span className={`currency-flag currency-flag-${props.data.value}`} />
      <span className="currency-key">{props.data.value.toUpperCase()}</span>
    </div>
  </components.SingleValue>
);

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  handleChange = () => {},
  selectedCurrency,
  label
}) => {
  const handleDropdownChange = (newValue: SingleValue<Currency> | MultiValue<Currency>) => {
    if (newValue && !Array.isArray(newValue)) handleChange(newValue as Currency);
  };

  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <Select
        options={currency.filter(item => item.value !== selectedCurrency.value)}
        onChange={handleDropdownChange}
        placeholder={placeholder}
        value={selectedCurrency}
        styles={customStyles}
        components={{ Option: OptionComponent, SingleValue: SingleValueComponent }}
        isSearchable={true}
        isClearable={false}
        isMulti={false}
      />
    </div>
  );
};
