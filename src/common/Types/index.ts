export interface Pages {
  title: string;
  address: string;
}

export interface ExchangeCurrency {
  currency: string;
  rate: string;
  timestamp: string;
}

export interface CurrencyConversionInput {
  to: string;
  from: string;
  amount: string;
}

export enum CurrencyConversionActionTypes {
  // eslint-disable-next-line no-unused-vars
  INPUT_CONVERSION_VALUES,
}

export interface CurrencyConverionActions {
  type: CurrencyConversionActionTypes;
  payload: { name: string; value: string };
}

export interface currencyData {
  to: string;
  from: string;
  amount: number;
  price: number;
  isFound: boolean;
}
