import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Card,
  alpha,
  Stack,
  Typography,
  Chip,
  IconButton,
  InputLabel,
} from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {
  FormProvider,
  FTextField,
  FUploadImage,
  FDatePicker,
  FSelect,
} from "../../components/form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { createPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import TagModal from "../tag/tagModal";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";

import { fetchHabits } from "../../features/habit/habitSlice";
import { createGoal } from "./goalSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Content is required"),
});

const defaultValues = {
  name: "",
  description: "",
  image: null,
  habits: "",
  startDate: dayjs(),
  endDate: dayjs(),
};

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

// const HABITS_PER_PAGE = 10;

function GoalForm() {
  const { user } = useAuth();
  // console.log("🚀 ~ GoalForm ~ user:", user);

  const userId = user._id;
  const { isLoading } = useSelector((state) => state.post);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  // const [habitList, setHabitList] = useState([]);
  const { habits, currentPage } = useSelector(
    (state) => ({
      habits: state.habit.habits,
      // totalHabits: state.habit.totalHabits,
      currentPage: state.habit.currentPage,
    }),
    shallowEqual
  );

  const tags = useSelector((state) => state.tag.tags);
  // console.log("🚀 ~ GoalForm ~ habits:", habits);

  const handleOpenTagModal = () => {
    setIsTagModalOpen(true);
  };
  const handleCloseTagModal = () => {
    setIsTagModalOpen(false);
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // const totalPages = Math.ceil(totalHabits / HABITS_PER_PAGE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(fetchHabits(currentPage));
    // console.log("🚀 ~ HabitList ~ habits:", habits);
    // console.log("🚀 ~ HabitList ~ currentPage", currentPage);
  }, [userId, dispatch, currentPage]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data: GoalForm.js", data);
    try {
      data.createdBy = userId;
      dispatch(createGoal(data));
      reset();
    } catch (error) {
      console.log("Failed to create Goal", error);
    }
  };

  return (
    <Box
      component={Card}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //border: "1px solid black",
        maxWidth: "450px",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Create Goal
        </Typography>
        <Stack spacing={2}>
          <FTextField
            name="name"
            multiline
            fullWidth
            rows={1}
            label="Title"
            placeholder="Tittle: Drink 2 litres of water daily"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FTextField
            name="description"
            multiline
            fullWidth
            rows={3}
            label="Description"
            placeholder="Note: 6 times a day - 8am, 10am, 12pm, 2pm, 4pm, 6pm"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FSelect name="habits" label="Habit">
            {habits.map((habit) => (
              <option key={habit._id} value={habit._id}>
                {habit.name}
              </option>
            ))}
          </FSelect>
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Typography variant="h6" gutterBottom>
            Date:
          </Typography>
          <InputLabel htmlFor="startDate">Start Date</InputLabel>
          <FDatePicker name="startDate" helperText="MM/DD/YYYY" readOnly />

          <InputLabel htmlFor="endDate">End Date</InputLabel>
          <FDatePicker name="endDate" helperText="MM/DD/YYYY" />

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Typography variant="h6" gutterBottom>
              Tag:
            </Typography>
            {tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            ))}

            <IconButton
              color="primary"
              aria-label="add tag"
              onClick={handleOpenTagModal}
            >
              <AddIcon />
            </IconButton>
            <TagModal open={isTagModalOpen} handleClose={handleCloseTagModal} />
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting || isLoading}
            >
              Create
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default GoalForm;
