import {
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
} from "@mui/material";

interface Props {
  min: number;
  max: number;
  average: number;
}

const Statistics: React.FunctionComponent<Props> = ({
  min,
  max,
  average,
}: Props) => {
  return (
    <TableContainer component={Paper} sx={{ width: { xs: "100%", sm: "45%" } }}>
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
  );
};

export default Statistics;
