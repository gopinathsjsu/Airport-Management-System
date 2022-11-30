import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';

export default function ResponsiveDateTimePickers(props) {
  const [value, setValue] = React.useState(dayjs(props.time));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          id = "time"
          label="Flight Time"
          renderInput={(params) => <TextField {...params} />}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
    </LocalizationProvider>
  );
}
