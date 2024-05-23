import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProgress } from "../../features/progress/progressSlice"; // Import updateHabit

const ProgressCard = ({ progress }) => {
  const [status, setStatus] = React.useState(progress.status);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
    console.log("Habit Card:", progress); // Add this line
    dispatch(
      updateProgress({
        id: progress._id,
        updates: { status: event.target.checked },
      })
    ); // Dispatch updateHabi1t
  };

  return (
    <Card disabled={status}>
      <CardContent>
        <Tooltip title={progress.name} placement="top">
          <Typography variant="h5" component="h2">
            {progress.name.substring(0, 30)}
          </Typography>
        </Tooltip>
        <Tooltip title={progress.description} placement="top">
          <Typography variant="body2" component="p">
            {progress.description.substring(0, 30)}
          </Typography>
        </Tooltip>
        <Checkbox checked={status} onChange={handleStatusChange} />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
