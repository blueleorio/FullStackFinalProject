import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function FDatePicker({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs()}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          value={value}
          onChange={(date) => onChange(dayjs(date))}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </DatePicker>
      )}
    />
  );
}

export default FDatePicker;
