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
  const [status, setStatus] = React.useState(progress.isDone);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
    console.log("Progress Card:", progress); // Add this line
    dispatch(
      updateProgress({
        id: progress._id,
        updates: { isDone: event.target.checked },
      })
    ); // Dispatch update Progress
  };

  return (
    <Card disabled={status}>
      <CardContent>
        <Tooltip title={progress.name} placement="top">
          <Typography variant="h5" component="h2">
            {progress.date}
          </Typography>
        </Tooltip>
        <Tooltip title={progress.description} placement="top">
          <Typography variant="body2" component="p">
            {progress.userId}
          </Typography>
        </Tooltip>
        <Checkbox checked={status} onChange={handleStatusChange} />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
