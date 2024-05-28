import React from "react";

import { useDispatch } from "react-redux";
// import { updateGoal } from "../../features/goal/goalSlice"; // Import updateGoal
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  // Checkbox,
} from "@mui/material";

const GoalCard = ({ goal }) => {
  // const [status, setStatus] = React.useState(goal.status);
  const dispatch = useDispatch();

  // const handleStatusChange = (event) => {
  //   setStatus(event.target.checked);
  //   console.log("Goal Card:", goal); // Add this line
  //   dispatch(
  //     updateGoal({ id: goal._id, updates: { status: event.target.checked } })
  //   ); // Dispatch updateGoal
  // };

  return (
    <Card>
      <CardContent>
        <Tooltip title={goal.name} placement="top">
          <Typography variant="h5" component="h2">
            {goal.name.substring(0, 30)}
          </Typography>
        </Tooltip>
        <Tooltip title={goal.description} placement="top">
          <Typography variant="body2" component="p">
            {goal.description.substring(0, 30)}
          </Typography>
        </Tooltip>
        {/* <Checkbox checked={status} onChange={handleStatusChange} /> */}
      </CardContent>
    </Card>
  );
};

export default GoalCard;
