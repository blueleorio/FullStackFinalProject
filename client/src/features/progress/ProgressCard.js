import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProgress } from "../../features/progress/progressSlice"; // Import updateHabit
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import doneImg from "../../logo-light.png";

import { toast } from "react-toastify";

dayjs.extend(utc);

const ProgressCard = ({ progress }) => {
  const [status, setStatus] = React.useState(progress.isDone);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleStatusChange = () => {
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    setStatus(!status);
    dispatch(
      updateProgress({
        id: progress._id,
        updates: { isDone: !status },
      })
    );
    setDialogOpen(false);
    toast.success("Congrats! You are going to place = Hall of Fame!");
  };

  const localDate = dayjs
    .utc(progress.date)
    .local()
    .format("dddd - DD/MM/YYYY");


  return (
    <>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          background: "#ACE1AF",
          transition: "transform 0.15s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          position: "relative",
        }}
        raised={true}
      >
        {status && (
          <div style={{ display: isHovered ? "none" : "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <img src={doneImg} alt="Done" style={{ width: "15%" }} />
            <p>Ding Dong DONE</p>
          </div>
        )}
        <CardContent style={{ display: isHovered || !status ? "block" : "none" }}>
          {status ? (
            <>
              <Typography variant="h5" component="p">
                {progress.habitId.name.length > 15 ? progress.habitId.name.substring(0, 15) + "..." : progress.habitId.name}
              </Typography>
              <Typography variant="h6" component="h2">
                {localDate}
              </Typography>
              <Typography variant="body2" component="p">
                Description: {progress.habitId.description}
              </Typography>
            </>
          ) : (
            <>
                <Tooltip title={progress.habitId.name} placement="top">
              <Typography variant="h5" component="p" sx={{ fontStyle: "italic" }}>
                {progress.habitId.name.length > 20 ? progress.habitId.name.substring(0, 20) + "..." : progress.habitId.name}
              </Typography>
              </Tooltip>
              <Typography variant="h6" component="p" align="left">
                {localDate}
              </Typography>
              <Typography variant="body2" component="p" align="left" >
                Description: {progress.habitId.description}
              </Typography>
              Done:
              <Checkbox
                checked={status}
                onChange={handleStatusChange}
                disabled={status}
              />
            </>
          )}
        </CardContent>
        <ConfirmationDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={handleConfirm}
          confirmMessage={[
            "Once you confirm, you can't undo this action.",
            "Are you sure you want to continue?",
            "Please type 'Okie' to confirm!!!",
          ]}
          confirmKeyword="Okie"
        />
      </Card >
    </>
  );
};

export default ProgressCard;
