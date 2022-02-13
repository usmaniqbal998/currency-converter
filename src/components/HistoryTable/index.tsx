import {
  Box,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Fetch from "../../utils/axios";

interface Props {
  duration: number;
  currency: string;
}

const HistoryTable: React.FunctionComponent<Props> = ({
  duration,
  currency,
}: Props) => {
  const [exchangeHistory, setExchangeHistory] = useState([]);

  const max = Math.max(
    ...exchangeHistory.map(
      (historyData: { timestamp: string; rate: number }) => historyData.rate
    )
  );
  const min = Math.min(
    ...exchangeHistory.map(
      (historyData: { timestamp: string; rate: number }) => historyData.rate
    )
  );

  const sum = exchangeHistory.reduce(
    (total: number, historyData: { timestamp: string; rate: number }) =>
      (total += Number(historyData.rate)),
    0
  );
  console.log(sum);
  const average = sum / exchangeHistory.length;

  useEffect(() => {
    if (currency) {
      //  because nomics free version allows one api call in 1 sec otherwise
      //  throw too many requests error
      setTimeout(() => {
        getHistory(currency);
      }, 1000);
    }
  }, [currency, duration]);

  const getHistory = async (currency: string) => {
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
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { sm: "space-between" },
        mt: 2,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ width: { xs: "100%", sm: "50%" } }}
      >
        <Table aria-label="exchange-history-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Exchange rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchangeHistory.map((historydata: any, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {dayjs(historydata.timestamp).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="left">
                  {Number(historydata.rate).toFixed(3)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
        component={Paper}
        sx={{ width: { xs: "100%", sm: "45%" } }}
      >
        <Table aria-label="exchange-history-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Statistics</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Max
              </TableCell>
              <TableCell align="left">{max}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Min
              </TableCell>
              <TableCell align="left">{min}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Average
              </TableCell>
              <TableCell align="left">{average}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryTable;
