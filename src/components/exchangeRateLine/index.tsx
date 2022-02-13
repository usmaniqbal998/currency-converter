import { Paper } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { HistoryData } from "../../common/Types";

interface Props {
  historyData: HistoryData[];
}

const ExchangeRateLine: React.FunctionComponent<Props> = ({
  historyData,
}: Props) => {
  const getTransformedData = () => {
    return [
      {
        id: "currency exchange rate",
        data: historyData.map((item: HistoryData) => {
          return { x: dayjs(item.timestamp).format("DD/MM"), y: item.rate };
        }),
      },
    ];
  };

  return (
    <Paper variant="outlined" elevation={1} sx={{ width: "100%" }}>
      <ResponsiveLine
        data={getTransformedData()}
        margin={{ top: 10, right: 20, bottom: 60, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        colors={{ scheme: "accent" }}
        enableArea={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "duration",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "rate",
          legendOffset: -60,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </Paper>
  );
};

export default ExchangeRateLine;
