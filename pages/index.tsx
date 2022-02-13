import { useCallback, useEffect, useReducer, useState } from "react";
import type { NextPage } from "next";
import { v4 as uid } from "uuid";
import { useRouter } from "next/router";
import { Divider, Typography } from "@mui/material";

import Fetch from "../src/utils/axios";
import { ExchangeCurrency, currencyData } from "../src/common/Types";
import {
  getCurrencyReducer,
  getInitialInputData,
  initialCurrencyFormInput,
} from "../src/utils/getCurrencyReducer";
import ConversionWidget from "../src/components/ConversionWidget";
import HistoryDuration from "../src/components/HistoryDuration";
import HistoryTable from "../src/components/HistoryTable";
import useStorage from "../src/hooks/useStorage";

interface Props {
  availableCurrencies: string[];
}

const Home: NextPage<Props> = ({ availableCurrencies }: Props) => {
  const router = useRouter();
  const [conversionStorage, setConversionStorage] =
    useStorage("conversionHistory");

  const [toConvert, dispatch] = useReducer(
    getCurrencyReducer,
    initialCurrencyFormInput,
    (init) => getInitialInputData(init, conversionStorage, router)
  );

  const [conversionData, setConversionData] = useState<currencyData>({
    to: "",
    from: "",
    amount: 0,
    price: 0,
    isFound: null,
  });
  const [duration, setDuration] = useState(7);

  const convertCurrency = useCallback(
    async (storage: boolean) => {
      try {
        const convertedCurrency = await Fetch("/currencies/ticker", {
          params: {
            ids: toConvert.to,
            convert: toConvert.from,
            status: "active",
          },
        });

        if (convertedCurrency.status === 200) {
          if (convertedCurrency.data.length === 0) {
            setConversionData({
              ...conversionData,
              to: toConvert.to,
              from: toConvert.from,
              isFound: false,
            });
          } else {
            setConversionData({
              to: toConvert.to,
              from: toConvert.from,
              amount: Number(toConvert.amount),
              price: Number(convertedCurrency.data[0].price),
              isFound: true,
            });
            if (storage)
              setConversionStorage((storageData: any) => [
                {
                  id: uid(),
                  to: toConvert.to,
                  from: toConvert.from,
                  amount: Number(toConvert.amount),
                  price: Number(convertedCurrency.data[0].price),
                },
                ...storageData,
              ]);
          }
        }
      } catch (error) {
        // add error logic later
        console.log(error);
      }
    },
    [conversionData, setConversionStorage, toConvert]
  );

  useEffect(() => {
    if (router.query.id) {
      // in free version nomics offers only 1 call in 1 sec or else give error
      setTimeout(() => {
        convertCurrency(false);
      }, 1000);
    }
  }, [router.query.id, convertCurrency]);

  const onDurationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };

  return (
    <>
      <ConversionWidget
        dispatch={dispatch}
        convertCurrencyCallback={() => convertCurrency(true)}
        toConvert={toConvert}
        availableCurrencies={availableCurrencies}
        conversionData={conversionData}
      />
      {conversionData.isFound && (
        <>
          <Divider sx={{ m: 4 }} />
          <Typography variant="h5">Exchange History</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Note: in free version nomics give exchange history only in USD
            Conversion *
          </Typography>

          <HistoryDuration
            daysHistory={duration}
            onChangeCallback={onDurationChanged}
          />
          <HistoryTable duration={duration} currency={conversionData.to} />
        </>
      )}
    </>
  );
};

export async function getStaticProps() {
  let availableCurrencies: string[] = [];
  try {
    const currencies = await Fetch.get("/exchange-rates");
    if (currencies.status === 200) {
      availableCurrencies = currencies.data.map(
        ({ currency }: ExchangeCurrency) => currency
      );
    }
  } catch (error) {
    //  execute error or not found policy here if any on server
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
