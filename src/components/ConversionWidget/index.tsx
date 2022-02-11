import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {
  CurrencyConverionActions,
  CurrencyConversionInput,
  CurrencyConversionActionTypes,
  currencyData,
} from "../../common/Types";

interface Props {
  availableCurrencies: string[];
  dispatch: React.Dispatch<CurrencyConverionActions>;
  toConvert: CurrencyConversionInput;
  convertCurrencyCallback: () => void;
  conversionData: currencyData;
}

const ConversionWidget: React.FunctionComponent<Props> = ({
  availableCurrencies,
  dispatch,
  convertCurrencyCallback,
  toConvert,
  conversionData,
}: Props) => {
  const defaultProps = {
    options: availableCurrencies,
  };

  return (
    <Box>
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
          <CompareArrowsIcon color="primary" />
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

      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexDirection: "column",
        }}
      >
        {conversionData.isFound ? (
          <>
            <Box>
              <Typography
                component="span"
                sx={{ fontWeight: 400, fontSize: "40px" }}
              >
                {conversionData.amount} {conversionData.from} =
              </Typography>
              <Typography
                color="primary"
                component="span"
                sx={{ fontWeight: 600, fontSize: "40px" }}
              >
                {conversionData.amount / conversionData?.price}{" "}
                {conversionData.to}
              </Typography>
            </Box>

            <Box>
              <Typography
                component="span"
                sx={{ fontWeight: 300, fontSize: "16px" }}
              >
                1 {conversionData.to} ={conversionData.price}{" "}
                {conversionData.from}
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                sx={{ fontWeight: 300, fontSize: "16px" }}
              >
                1 {conversionData.from} = {1 / conversionData?.price}{" "}
                {conversionData.to}
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              component="span"
              sx={{ fontWeight: 400, fontSize: "20px" }}
            >
              No Data Found for {conversionData.from} to {conversionData.to} :(
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontWeight: 300, fontSize: "20px" }}
            >
              Dont Trust me ? Try in Browser
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontWeight: 300, fontSize: "16px" }}
            >
              https://api.nomics.com/v1/currencies/ticker?key=4465e0ac22021c66a32691e2e3a4641d39c557ca&ids=
              {conversionData.to}&convert={conversionData.from}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConversionWidget;
