import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Fetch from "../src/utils/axios";
import { ExchangeCurrency } from "../src/common/Types";
import { useReducer } from "react";

interface Props {
  availableCurrencies: ExchangeCurrency[];
}

const Home: NextPage<Props> = ({ availableCurrencies }: Props) => {
  // const [state,dispatch] = useReducer()

  const defaultProps = {
    options: availableCurrencies,
    getOptionLabel: (option: ExchangeCurrency) => option.currency,
  };
  return (
    <Box>
      <Typography
        sx={{ mt: 1.5, fontWeight: "500", color: "#333" }}
        variant="h4"
      >
        I want to Convert
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          type="number"
          sx={{ width: { md: "280px", xs: "100%" } }}
          name="amount"
          id="amount"
          label="Amount"
          variant="standard"
          inputProps={{
            min: "0",
          }}
        />
        <Autocomplete
          {...defaultProps}
          disablePortal
          id="currencies-from"
          sx={{ width: { md: "280px", xs: "100%" } }}
          renderInput={(params) => (
            <TextField
              {...params}
              type="text"
              label="From"
              variant="standard"
            />
          )}
        />

        <IconButton
          aria-label="invert"
          component="span"
          sx={{ display: { xs: "none", sm: "inline-block" } }}
          disableRipple
        >
          <CompareArrowsIcon color="primary" />
        </IconButton>

        <Autocomplete
          {...defaultProps}
          disablePortal
          id="currencies-to"
          sx={{ width: { md: "280px", xs: "100%" } }}
          renderInput={(params) => (
            <TextField {...params} type="text" label="To" variant="standard" />
          )}
        />

        <Button variant="contained">Convert</Button>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  let availableCurrencies: ExchangeCurrency[] = [];
  try {
    const currencies = await Fetch.get("/exchange-rates");
    if (currencies.status === 200) {
      availableCurrencies = currencies.data;
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
