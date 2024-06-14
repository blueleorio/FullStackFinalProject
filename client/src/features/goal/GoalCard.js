import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";

import CardDialog from "../../components/CardDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import {
  deleteGoal,
  fetchGoals,
  fetchGoalProgress,
} from "../../features/goal/goalSlice";

import { toast } from "react-toastify"

const GoalCard = ({ goal }) => {
  const isLoading = useSelector((state) => state.goal.isLoading);
  //eslint-disable-next-line
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [progressInfo, setProgressInfo] = React.useState({
    percent: 0,
    totalProgress: 0,
    doneProgress: 0,
  });
  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    await dispatch(deleteGoal(goal._id));
    // ! TODO => adjusting the limit
    await dispatch(fetchGoals({ limit: 3, page: 1 }));
    toast.success("This is going to Hall of Shame")
    setDialogOpen(false);
  };

  const handleOpen = () => {
    setLoading(true);
    dispatch(fetchGoalProgress(goal._id)).then((response) => {
      const { percent, totalProgress, doneProgress } = response.payload;
      setProgressInfo({ percent, totalProgress, doneProgress });
      setLoading(false);
      setOpen(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!isLoading) {
      handleClose();
    }
  }, [isLoading]);
  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          background: "#F0E68C",
          transition: "transform 0.15s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },

        }}
        raised={true}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between" height="100%">
          <CardContent sx={{ maxWidth: "calc(100% - 48px)" }}>
            <Tooltip title={goal.name} placement="top">
              <Typography variant="h5" component="h2" noWrap>
                {goal.name.length > 15 ? goal.name.substring(0, 15) + "..." : goal.name}
              </Typography>
            </Tooltip>
            <Tooltip title={goal.description} placement="top">
              <Typography variant="body2" component="p">
                {goal.description.substring(0, 30)}
              </Typography>
            </Tooltip>
          </CardContent>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDialogOpen();
            }}
            sx={{ alignSelf: "flex-start" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
      <CardDialog
        open={open}
        handleClose={handleClose}
        data={goal}
        dataType="goal"
        progress={progressInfo}
      />
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
    </>
  );
};

export default GoalCard;
