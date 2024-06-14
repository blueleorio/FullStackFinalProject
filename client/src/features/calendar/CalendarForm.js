import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { fetchProgressesForDate, setCurrentDate } from "../progress/progressSlice";

export default function BasicDateCalendar({
  value: initialValue,
  onChange,
  views,
}) {
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
    const formattedDate = date.utc().format("YYYY-MM-DD");

    // Check if formattedDate is defined before dispatching the action
    if (formattedDate) {
      // Dispatch the fetchProgress action with the formatted date
      dispatch(setCurrentDate(formattedDate));
      dispatch(fetchProgressesForDate({ date: formattedDate, page: 1 }));
    } else {
      console.error("formattedDate is undefined");
    }
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const today = dayjs();
    const formattedToday = today.utc().format("YYYY-MM-DD");
    dispatch(setCurrentDate(formattedToday));
    dispatch(fetchProgressesForDate({ date: formattedToday, page: 1 }));
  }, [dispatch]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    fetchProgressForDateCalendar(newValue);
  };


  return (
    <DateCalendar
      value={value}
      onChange={handleChange}
      views={views}
      shouldDisableDate={disableTimeBeforeCreateAccount}
    />
  );
}
