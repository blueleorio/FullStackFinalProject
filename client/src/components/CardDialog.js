import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateHabit, fetchHabits } from "../features/habit/habitSlice";
import { updateGoal, fetchGoals } from "../features/goal/goalSlice";
import { fetchProgressesById } from "../features/progress/progressSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, FTextField } from "../components/form";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { toast } from "react-toastify";

const yupSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

dayjs.extend(utc);

const CardDialog = ({ open, handleClose, data, dataType, progress }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) =>
    dataType ? state[dataType] : { isLoading: false }
  );

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      name: data ? data.name : "",
      description: data ? data.description : "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (dataType === "habit") {
      try {
        await dispatch(updateHabit({ id: data._id, updates: values }));
        await dispatch(fetchHabits({ limit: 10, page: 1 }));
        await dispatch(fetchProgressesById(data._id));
        toast.success("Habit updated successfully!");
      } catch (error) {
        console.error("Failed to update habit:", error);
      }
    } else if (dataType === "goal") {
      try {
        await dispatch(updateGoal({ id: data._id, updates: values }));
        await dispatch(fetchGoals({limit: 10, page: 1}));
        toast.success("Goal updated successfully!");
      } catch (error) {
        console.error("Failed to update goal:", error);
      }
    }

  };

  let renderGoalPercentage;

  if (dataType === "goal") {
    renderGoalPercentage = (
      <Box>
        <Typography variant="overline" display="block" gutterBottom>
          Total: {progress.totalProgress || 0}
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Streak: {progress.doneProgress || 0}
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Percentage: {(progress.percent || 0).toFixed(2)}%
        </Typography>
      </Box>
    );
  }

  const start = dayjs
    .utc(data.startDate)
    .local()
    .format("dddd - DD/MM/YYYY");

  const end = dayjs
    .utc(data.endDate)
    .local()
    .format("dddd - DD/MM/YYYY");
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="overline" gutterBottom>
                Name
              </Typography>
              <FTextField name="name" />
              <Typography variant="overline" gutterBottom>
                Description
              </Typography>
              <FTextField name="description" />
              <Box>
                <Typography variant="overline" display="block" gutterBottom>
                  Start: {start}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  End: {end}
                </Typography>
              </Box>
              {renderGoalPercentage}
            </FormProvider>
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
