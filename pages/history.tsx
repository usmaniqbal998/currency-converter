import { useRouter } from "next/router";
import {
  Paper,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import useStorage from "../src/hooks/useStorage";
import { currencyStorage } from "../src/common/Types";

const Home: NextPage = () => {
  const router = useRouter();
  const [conversionStorage, setConversionStorage] = useStorage(
    "conversionHistory",
    []
  );

  function viewConversion(id: string) {
    router.push({ pathname: "/", query: { id } });
  }

  const deleteItem = (id: string) => {
    setConversionStorage((data: currencyStorage[]) =>
      data.filter((d: currencyStorage) => d.id !== id)
    );
  };

  if (conversionStorage.length === 0)
    return (
      <Typography sx={{ mt: 1.5, fontWeight: "500" }} variant="h4">
        No Conversion History Available
      </Typography>
    );

  return (
    <>
      <Typography sx={{ mt: 1.5, fontWeight: "500" }} variant="h4">
        Conversion History
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ mt: 4, width: { xs: "100%", sm: "50%" } }}
      >
        <Table aria-label="exchange-history-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Events</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversionStorage.map((historydata: currencyStorage) => (
              <TableRow key={historydata.id}>
                <TableCell component="th" scope="row">
                  Converted an ammount of <b>{historydata.amount}</b> from{" "}
                  <b>{historydata.from}</b> to <b>{historydata.to}</b>
                </TableCell>
                <TableCell align="left">
                  <Box sx={{ display: "flex" }}>
                    <IconButton onClick={() => viewConversion(historydata.id)}>
                      <RemoveRedEyeIcon color="primary" />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => deleteItem(historydata.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
