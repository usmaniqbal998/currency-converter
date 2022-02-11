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
import {
  CurrencyConversionInput,
  ExchangeCurrency,
  CurrencyConverionActions,
  CurrencyConversionActionTypes,
} from "../src/common/Types";
import { useReducer } from "react";

interface Props {
  availableCurrencies: string[];
}
const initialState: CurrencyConversionInput = {
  amount: "0",
  to: "USD",
  from: "EUR",
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
  const [state, dispatch] = useReducer(getCurrency, initialState);

  const defaultProps = {
    options: availableCurrencies,
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
          value={state.amount}
          onChange={(e) =>
            dispatch({
              type: CurrencyConversionActionTypes.INPUT_CONVERSION_VALUES,
              payload: { name: e.target.name, value: e.target.value },
            })
          }
          inputProps={{
            min: "0",
          }}
        />
        <Autocomplete
          {...defaultProps}
          disablePortal
          id="currencies-from"
          sx={{ width: { md: "280px", xs: "100%" } }}
          value={state.from}
          freeSolo
          // eslint-disable-next-line no-unused-vars
          onChange={(e, value) => {
            dispatch({
              type: CurrencyConversionActionTypes.INPUT_CONVERSION_VALUES,
              payload: { name: "from", value: value || "" },
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              type="text"
              label="From"
              variant="standard"
              name="from"
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
          value={state.to}
          freeSolo
          // eslint-disable-next-line no-unused-vars
          onChange={(e, value) => {
            dispatch({
              type: CurrencyConversionActionTypes.INPUT_CONVERSION_VALUES,
              payload: { name: "to", value: value || "" },
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              type="text"
              label="To"
              variant="standard"
              name="to"
            />
          )}
        />

        <Button variant="contained">Convert</Button>
      </Box>
    </Box>
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
