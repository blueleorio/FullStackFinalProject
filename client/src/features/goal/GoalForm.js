// External libraries
import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Material UI components and icons
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
import { LoadingButton } from "@mui/lab";

// Internal modules
import {
  FormProvider,
  FTextField,
  FDatePicker,
  FSelect,
} from "../../components/form";
import TagModal from "../tag/tagModal";
import useAuth from "../../hooks/useAuth";
import { fetchHabits } from "../../features/habit/habitSlice";
import { createGoal } from "./goalSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Content is required")
    .matches(
      /^[^\p{P}\p{S}]*$/u,
      "Name should only contain letters and spaces"
    ),
  description: Yup.string().matches(
    /^[^\p{P}\p{S}]*$/u,
    "Description should only contain letters and spaces"
  ),
  habitId: Yup.string().required("Habit is required"),
  repeat: Yup.number()
    .required("Repeat is required")
    .min(1, "Repeat must be at least 1")
    .integer("Repeat must be an integer"),
});

const defaultValues = {
  name: "",
  description: "",
  habitId: "",
  startDate: dayjs(),
  endDate: dayjs(),
  repeat: 1,
  counter: "",
};

// const HABITS_PER_PAGE = 10;

function GoalForm() {
  const { user } = useAuth();
  const today = dayjs();

  const userId = user._id;
  const { isLoading } = useSelector((state) => state.goal);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [addTag, setAddTag] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const { habits } = useSelector(
    (state) => ({
      habits: state.habit.habits,
    }),
    shallowEqual
  );


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
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const selectedHabitId = watch("habitId");

  // const totalPages = Math.ceil(totalHabits / HABITS_PER_PAGE);

  const dispatch = useDispatch();


  // Function to add a new tag to the state
  const handleNewTag = (newTagObject) => {
    setAddTag((prevTags) => [...prevTags, newTagObject]);
  };

  // Delete tag
  const handleDelete = (id) => {
    setAddTag((prevTags) => prevTags.filter((tag) => tag._id !== id))
  };

  useEffect(() => {
    // This will update the 'tags' field in your form with the current addTag array
    setValue('tags', addTag);
  }, [addTag, setValue]);

  useEffect(() => {
    if (userId) dispatch(fetchHabits({ limit: 20, page: 1 }));
  }, [userId, dispatch]);

  // Effect to update selected habit's end date

  useEffect(() => {
    const habit = habits.find((habit) => habit._id === selectedHabitId);
    setSelectedHabit(habit);
    if (habit && habit.endDate) {
      setEndDate(dayjs(habit.endDate));
    } else {
      setEndDate(null); // Reset if no habit is selected or if selected habit has no end date
    }
  }, [selectedHabitId, habits]);

  const onSubmit = async (data) => {
    try {
      data.createdBy = userId;
      data.counter = selectedHabit.counter;
      dispatch(createGoal(data));
      reset();
      toast.success("Goal created successfully");
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
        justifyCont5ent: "center",
        width: "100%"
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
          <FSelect name="habitId" >
            <option value="">Select a habit</option>
            {habits.map((habit) => (
              <option key={habit._id} value={habit._id}>
                {habit.name} ({habit.counter})
              </option>
            ))}
          </FSelect>


          {selectedHabit && selectedHabit.counter === "weekly" ? (
            <>
              <Typography variant="h6" gutterBottom>
                Date:
              </Typography>
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <FDatePicker
                name="startDate"
                helperText="MM/DD/YYYY"
                minDate={today}
                maxDate={endDate || undefined}
                onChange={(date) => setStartDate(date)}
                fullWidth
              />

              <InputLabel htmlFor="endDate">End Date</InputLabel>
              <FDatePicker
                name="endDate"
                helperText="MM/DD/YYYY"
                minDate={startDate}
                maxDate={endDate || undefined}
                fullWidth
              />
            </>
          ) : (
            (selectedHabit && (selectedHabit.counter === "monthly" || selectedHabit.counter === "yearly")) ? (<>
              <Typography variant="h6" gutterBottom>
                Streak:
              </Typography>
              <FTextField
                name="repeat"
                label="step"
                type="number"
                min={1}
                max={selectedHabit.repeat}
                onKeyPress={(event) => {
                  if (event.key === "e" || event.key === "E") {
                    event.preventDefault();
                  }
                }}
              />
            </>

            ) : (
              <Typography variant="h6" gutterBottom>
                Please pick your poison!!!
              </Typography>
            )
          )}

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Typography variant="h6" gutterBottom>
              Tag:
            </Typography>
            {addTag.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                color="primary"
                onDelete={() => handleDelete(tag._id)}
              />
            ))}

            <IconButton
              color="primary"
              aria-label="add tag"
              onClick={handleOpenTagModal}
            >
              <AddIcon />
            </IconButton>
            <TagModal open={isTagModalOpen} handleClose={handleCloseTagModal} onNewTag={handleNewTag} />
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%"
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
    </Box >
  );
}

export default GoalForm;
