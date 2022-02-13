import { CompareArrows } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  CurrencyConverionActions,
  CurrencyConversionInput,
  CurrencyConversionActionTypes,
} from "../../common/Types";

interface Props {
  availableCurrencies: string[];
  dispatch: React.Dispatch<CurrencyConverionActions>;
  toConvert: CurrencyConversionInput;
  convertCurrencyCallback: () => void;
}

const ConversionForm: React.FunctionComponent<Props> = ({
  dispatch,
  convertCurrencyCallback,
  toConvert,
  availableCurrencies,
}: Props) => {
  const defaultProps = {
    options: availableCurrencies,
  };

  return (
    <>
      <Typography sx={{ mt: 1.5, fontWeight: "500" }} variant="h4">
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
          value={toConvert.amount}
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
          value={toConvert.from}
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
          onClick={() => {
            dispatch({ type: CurrencyConversionActionTypes.INVERT_INPUTS });
          }}
        >
          <CompareArrows color="primary" />
        </IconButton>

        <Autocomplete
          {...defaultProps}
          disablePortal
          id="currencies-to"
          sx={{ width: { md: "280px", xs: "100%" } }}
          value={toConvert.to}
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

        <Button variant="contained" onClick={convertCurrencyCallback}>
          Convert
        </Button>
      </Box>
    </>
  );
};

export default ConversionForm;
