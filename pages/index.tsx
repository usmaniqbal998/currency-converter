import type { NextPage } from "next";
import Fetch from "../src/utils/axios";
import {
  CurrencyConversionInput,
  ExchangeCurrency,
  CurrencyConverionActions,
  CurrencyConversionActionTypes,
  currencyData,
} from "../src/common/Types";
import { useEffect, useReducer, useState } from "react";
import ConversionWidget from "../src/components/ConversionWidget";

interface Props {
  availableCurrencies: string[];
}
const initialState: CurrencyConversionInput = {
  amount: "100",
  to: "BTC",
  from: "USD",
};

function getCurrency(
  state: CurrencyConversionInput,
  action: CurrencyConverionActions
) {
  switch (action.type) {
    case CurrencyConversionActionTypes.INPUT_CONVERSION_VALUES: {
      return { ...state, [action.payload.name]: action.payload.value };
    }

    default:
      throw new Error("No such action available for currency conversion");
  }
}

const Home: NextPage<Props> = ({ availableCurrencies }: Props) => {
  const [toConvert, dispatch] = useReducer(getCurrency, initialState);
  const [conversionData, setConversionData] = useState<currencyData>({
    to: "",
    from: "",
    amount: 0,
    price: 0,
    isFound: false,
  });

  useEffect(() => {
    convertCurrency();
  }, []);

  const convertCurrency = async () => {
    try {
      const convertedCurrency = await Fetch("/currencies/ticker", {
        params: {
          ids: toConvert.to,
          convert: toConvert.from,
          interval: "1h",
          status: "active",
        },
      });

      if (convertedCurrency.data.length === 0) {
        setConversionData({
          ...conversionData,
          to: toConvert.to,
          from: toConvert.from,
          isFound: false,
        });
      }

      setConversionData({
        to: toConvert.to,
        from: toConvert.from,
        amount: Number(toConvert.amount),
        price: Number(convertedCurrency.data[0].price),
        isFound: true,
      });
    } catch (error) {
      // add error logic later
    }
  };

  return (
    <ConversionWidget
      dispatch={dispatch}
      convertCurrencyCallback={convertCurrency}
      toConvert={toConvert}
      availableCurrencies={availableCurrencies}
      conversionData={conversionData}
    />
  );
};

export async function getStaticProps() {
  let availableCurrencies: string[] = [];
  try {
    const currencies = await Fetch.get("/exchange-rates");
    if (currencies.status === 200) {
      availableCurrencies = currencies.data.map(
        (currency: ExchangeCurrency) => currency.currency
      );
    }
  } catch (error) {
    //  execute error or not found policy here if any
    console.log(error);
  }
  return {
    props: {
      availableCurrencies,
    },
    revalidate: 10000, // revalidate every 10000 seconds
  };
}

export default Home;
