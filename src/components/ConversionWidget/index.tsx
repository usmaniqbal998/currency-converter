import React from "react";
import { Box } from "@mui/material";
import {
  CurrencyConverionActions,
  CurrencyConversionInput,
  currencyData,
} from "../../common/Types";
import ConversionForm from "./conversionforms";
import ConversionResults from "./conversionresult";
import NotFound from "./notfound";

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
          <ConversionResults conversionData={conversionData} />
        ) : (
          <NotFound conversionData={conversionData} />
        )}
      </Box>
    </Box>
  );
};

export default ConversionWidget;
