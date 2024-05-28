import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  // Checkbox,
} from "@mui/material";
// import { useDispatch } from "react-redux";
// import { updateHabit } from "../../features/habit/habitSlice"; // Import updateHabit
import dayjs from "dayjs";
const HabitCard = ({ habit }) => {
  // const [status, setStatus] = React.useState(habit.status);
  // const dispatch = useDispatch();

  // const handleStatusChange = (event) => {
  //   setStatus(event.target.checked);
  //   console.log("Habit Card:", habit); // Add this line
  //   dispatch(
  //     updateHabit({ id: habit._id, updates: { status: event.target.checked } })
  //   ); // Dispatch updateHabit
  // };

  return (
    <Card>
      <CardContent>
        <Tooltip title={habit.name} placement="top">
          <Typography variant="h5" component="h2">
            {habit.name.substring(0, 30)}
          </Typography>
        </Tooltip>
        <Tooltip title={habit.description} placement="top">
          <Typography variant="body2" component="p">
            {habit.description.substring(0, 30)}
          </Typography>
        </Tooltip>
        {/* <Checkbox checked={status} onChange={handleStatusChange} /> */}
      </CardContent>
    </Card>
  );
};

export default HabitCard;
