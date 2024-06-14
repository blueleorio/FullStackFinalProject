import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteHabit, fetchHabits } from "../../features/habit/habitSlice";
import { fetchProgressesForDate } from "../../features/progress/progressSlice";
import { fetchGoals } from "../../features/goal/goalSlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const HabitCard = ({ habit }) => {
  const isLoading = useSelector((state) => state.habit.isLoading);
  const currentDate = useSelector((state) => state.progress.currentPage)
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();


  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    // setStatus(!status);
    try {
      await dispatch(deleteHabit(habit._id));
      await dispatch(fetchHabits({ limit: 10, page: 1 }));
      await dispatch(fetchGoals({ limit: 10, page: 1 }));
      await dispatch(fetchProgressesForDate({ date: currentDate, page: 1 }));
      setDialogOpen(false);
    } catch (error) {
      console.log("Error deleting habit", error);
    }
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
          background: "#F08080",
          transition: "transform 0.15s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        raised={true}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between" height="100%">
          <CardContent sx={{ maxWidth: "calc(100% - 48px)" }}>
            <Tooltip title={habit.name} placement="top">
              <Typography variant="h5" component="h2" noWrap>
                {habit.name.length > 15 ? habit.name.substring(0, 15) + "..." : habit.name}
              </Typography>
            </Tooltip>
            <Tooltip title={habit.description} placement="top">
              <Typography variant="body2" component="p">
                {habit.description.length > 30 ? habit.description.substring(0, 30) + "..." : habit.description}
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
        data={habit}
        dataType="habit"
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

export default HabitCard;
