import { Box, Typography } from "@mui/material";
import { currencyData } from "../../common/Types";

interface Props {
  conversionData: currencyData;
}

const ConversionResults: React.FunctionComponent<Props> = ({
  conversionData,
}: Props) => {
  return (
    <>
      <Box>
        <Typography
          component="span"
          sx={{ fontWeight: 400, fontSize: { xs: "32px", sm: "40px" } }}
        >
          {conversionData.amount} {conversionData.from} ={" "}
        </Typography>
        <Typography
          color="primary"
          component="span"
          sx={{ fontWeight: 600, fontSize: { xs: "32px", sm: "40px" } }}
        >
          {(conversionData.amount / conversionData?.price).toFixed(6)}{" "}
          {conversionData.to}
        </Typography>
      </Box>

      <Box>
        <Typography component="span" sx={{ fontWeight: 300, fontSize: "16px" }}>
          1 {conversionData.to} = {conversionData.price.toFixed(6)}{" "}
          {conversionData.from}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" sx={{ fontWeight: 300, fontSize: "16px" }}>
          1 {conversionData.from} = {(1 / conversionData?.price).toFixed(6)}{" "}
          {conversionData.to}
        </Typography>
      </Box>
    </>
  );
};

export default ConversionResults;
