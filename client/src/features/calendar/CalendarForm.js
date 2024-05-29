import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { fetchProgressesForDate } from "../progress/progressSlice";

export default function BasicDateCalendar({
  value: initialValue,
  onChange,
  views,
}) {
  // console.log("Rendering BasicDateCalendar", { initialValue, onChange, views });
  const { user } = useAuth();
  const dispatch = useDispatch();
  const signupDate = user.createdAt;
  const [value, setValue] = React.useState(initialValue || dayjs());

  const disableTimeBeforeCreateAccount = (date) => {
    // Convert the date to a Day.js object and the signupDate to a Day.js object
    const dayjsDate = dayjs(date);
    const dayjsSignupDate = dayjs(signupDate);

    // Return true if the date is before the signup date
    return dayjsDate.isBefore(dayjsSignupDate, "day");
  };

  const fetchProgressForDateCalendar = (date) => {
    // Convert the date to the format expected by your backend
    const formattedDate = date.format("YYYY-MM-DD");

    // Check if formattedDate is defined before dispatching the action
    if (formattedDate) {
      // Dispatch the fetchProgress action with the formatted date
      dispatch(fetchProgressesForDate(formattedDate));
      // console.log("Dispatched fetchProgressesForDate");
    } else {
      console.error("formattedDate is undefined");
    }
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    fetchProgressForDateCalendar(newValue);
  };

  console.log("🚀 ~ BasicDateCalendar ~ value:", value.format("YYYY-MM-DD"));

  return (
    <DateCalendar
      value={value}
      onChange={handleChange}
      views={views}
      shouldDisableDate={disableTimeBeforeCreateAccount}
    />
  );
}
