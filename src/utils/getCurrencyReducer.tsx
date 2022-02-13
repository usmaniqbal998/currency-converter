import { NextRouter } from "next/router";
import {
  CurrencyConverionActions,
  CurrencyConversionActionTypes,
  CurrencyConversionInput,
  currencyStorage,
} from "../common/Types";

export const initialCurrencyFormInput: CurrencyConversionInput = {
  amount: "0",
  from: "USD",
  to: "BTC",
};

export function getInitialInputData(
  initial: CurrencyConversionInput,
  conversionStorage: currencyStorage[],
  router: NextRouter
): CurrencyConversionInput {
  const { id } = router.query;
  //    case when a history storage item id is in url
  if (id) {
    const currency = conversionStorage.find(
      (historyData: currencyStorage) => historyData.id === id
    );
    if (currency) {
      return {
        amount: currency.amount.toString(),
        to: currency.to,
        from: currency.from,
      };
    }
  }
  //    case when user refreshes without any history storage id , show the previous loaded data
  if (conversionStorage.length > 0) {
    return {
      amount: conversionStorage[0].amount.toString(),
      to: conversionStorage[0].to,
      from: conversionStorage[0].from,
    };
  }
  //    default to initial data
  return initial;
}

export function getCurrencyReducer(
  state: CurrencyConversionInput,
  action: CurrencyConverionActions
) {
  switch (action.type) {
    case CurrencyConversionActionTypes.INPUT_CONVERSION_VALUES: {
      if (action.payload)
        return { ...state, [action.payload.name]: action.payload.value };
    }
    case CurrencyConversionActionTypes.INVERT_INPUTS: {
      let temp = state.to;
      return { ...state, to: state.from, from: temp };
    }

    default:
      throw new Error("No such action available for currency conversion");
  }
}
