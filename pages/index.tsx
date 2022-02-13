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
import HistoryDuration from "../src/components/HistoryDuration";
import { Divider, Typography } from "@mui/material";
import HistoryTable from "../src/components/HistoryTable";

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

const Home: NextPage<Props> = ({ availableCurrencies }: Props) => {
  const [toConvert, dispatch] = useReducer(getCurrency, initialState);
  const [conversionData, setConversionData] = useState<currencyData>({
    to: "",
    from: "",
    amount: 0,
    price: 0,
    isFound: false,
  });
  const [duration, setDuration] = useState(7);

  useEffect(() => {
    convertCurrency();
  }, []);

  const onDurationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };

  const convertCurrency = async () => {
    try {
      const convertedCurrency = await Fetch("/currencies/ticker", {
        params: {
          ids: toConvert.to,
          convert: toConvert.from,
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
      console.log(error);
    }
  };

  return (
    <>
      <ConversionWidget
        dispatch={dispatch}
        convertCurrencyCallback={convertCurrency}
        toConvert={toConvert}
        availableCurrencies={availableCurrencies}
        conversionData={conversionData}
      />
      <Divider sx={{ m: 4 }} />
      <Typography variant="h5" sx={{ mb: 3 }}>
        Exchange History
      </Typography>
      <HistoryDuration
        daysHistory={duration}
        onChangeCallback={onDurationChanged}
      />
      <HistoryTable duration={duration} currency={conversionData.to} />
    </>
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
