import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function FDatePicker({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs().tz(dayjs.tz.guess())}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          value={value}
          onChange={(date) => onChange(dayjs.utc(date))}
          fullWidth
          error={!!error}
          helperText={error?.message}
          timezone="system"
          {...other}
        >
          {children}
        </DatePicker>
      )}
    />
  );
}

export default FDatePicker;
