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
import ConversionForm from "./conversionForm";

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
  if (conversionData.isFound === null) {
    return (
      <ConversionForm
        availableCurrencies={availableCurrencies}
        dispatch={dispatch}
        convertCurrencyCallback={convertCurrencyCallback}
        toConvert={toConvert}
      />
    );
  }
  return (
    <Box>
      <ConversionForm
        availableCurrencies={availableCurrencies}
        dispatch={dispatch}
        convertCurrencyCallback={convertCurrencyCallback}
        toConvert={toConvert}
      />

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
