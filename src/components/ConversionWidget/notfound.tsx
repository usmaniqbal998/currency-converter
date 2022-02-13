import { Box, Typography } from "@mui/material";
import { currencyData } from "../../common/Types";

interface Props {
  conversionData: currencyData;
}

const NotFound: React.FunctionComponent<Props> = ({
  conversionData,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography component="span" sx={{ fontWeight: 400, fontSize: "20px" }}>
        No Data Found for {conversionData.from} to {conversionData.to} :(
      </Typography>
      <Typography textAlign="center" sx={{ fontWeight: 300, fontSize: "20px" }}>
        Dont Trust me ? Try in Browser
      </Typography>
      <Typography textAlign="center" sx={{ fontWeight: 300, fontSize: "16px" }}>
        https://api.nomics.com/v1/currencies/ticker?key=4465e0ac22021c66a32691e2e3a4641d39c557ca&ids=
        {conversionData.to}&convert={conversionData.from}
      </Typography>
    </Box>
  );
};

export default NotFound;
