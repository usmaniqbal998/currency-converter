import {
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
} from "@mui/material";
import dayjs from "dayjs";
import { HistoryData } from "../../common/Types";

interface Props {
  exchangeHistory: HistoryData[];
}

const ExchangeHistory: React.FunctionComponent<Props> = ({
  exchangeHistory,
}: Props) => {
  return (
    <TableContainer component={Paper} sx={{ width: { xs: "100%", sm: "50%" } }}>
      <Table aria-label="exchange-history-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Exchange rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeHistory.map((historydata: HistoryData, index: number) => (
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
  );
};

export default ExchangeHistory;
