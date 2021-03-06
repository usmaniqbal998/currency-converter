import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import ExchangeRateLine from "../exchangeRateLine";
import ExchangeHistory from "./exchangehostory";
import Statistics from "./statistics";
import { HistoryData } from "../../common/Types";
import Fetch from "../../utils/axios";

interface Props {
  duration: number;
  currency: string;
}

const HistoryTable: React.FunctionComponent<Props> = ({
  duration,
  currency,
}: Props) => {
  const [exchangeHistory, setExchangeHistory] = useState<HistoryData[]>([]);

  const max = Math.max(
    ...exchangeHistory.map((historyData: HistoryData) => historyData.rate)
  );
  const min = Math.min(
    ...exchangeHistory.map((historyData: HistoryData) => historyData.rate)
  );

  const sum = exchangeHistory.reduce(
    (total: number, historyData: HistoryData) =>
      (total += Number(historyData.rate)),
    0
  );
  console.log(sum);
  const average = sum / exchangeHistory.length;

  const getHistory = useCallback(
    async (currency: string) => {
      try {
        const history = await Fetch("/exchange-rates/history", {
          params: {
            start: dayjs().subtract(duration, "days").toISOString(),
            currency: currency,
          },
        });
        if (history.status === 200) {
          setExchangeHistory(history.data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    },
    [duration]
  );

  useEffect(() => {
    if (currency) {
      //  because nomics free version allows one api call in 1 sec otherwise
      //  throw too many requests error
      setTimeout(() => {
        getHistory(currency);
      }, 1000);
    }
  }, [currency, duration, getHistory]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          height: 400,
          width: "100%",
        }}
      >
        <ExchangeRateLine historyData={exchangeHistory} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          mt: 2,
        }}
      >
        <ExchangeHistory exchangeHistory={exchangeHistory} />

        <Statistics min={min} max={max} average={average} />
      </Box>
    </>
  );
};

export default HistoryTable;
