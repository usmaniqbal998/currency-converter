import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  daysHistory: number;
  // eslint-disable-next-line no-unused-vars
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const days = [
  {
    value: 7,
    label: "7 days",
  },
  {
    value: 14,
    label: "14 days",
  },
  {
    value: 30,
    label: "30 days",
  },
];

const HistoryDuration: React.FunctionComponent<Props> = ({
  daysHistory,
  onChangeCallback,
}: Props) => {
  return (
    <Box>
      <TextField
        id="select-history-duration"
        select
        label="Duration"
        value={daysHistory}
        onChange={onChangeCallback}
        variant="standard"
      >
        {days.map((day) => (
          <MenuItem key={day.value} value={day.value}>
            {day.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default HistoryDuration;
