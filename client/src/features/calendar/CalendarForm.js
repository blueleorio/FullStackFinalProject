import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function BasicDateCalendar({
  value: initialValue,
  onChange,
  views,
}) {
  const [value, setValue] = React.useState(initialValue || dayjs());

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  console.log("🚀 ~ BasicDateCalendar ~ value:", value.format("YYYY-MM-DD"));

  return <DateCalendar value={value} onChange={handleChange} views={views} />;
}
