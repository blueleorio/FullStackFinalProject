// Libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";


// Material UI
import {
  Box,
  Card,
  alpha,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

// Local components and utilities
import {
  FormProvider,
  FTextField,
  FDatePicker,
  FMultiCheckbox,
  FRadioGroup,
} from "../../components/form";
import DaysList from "../../components/DayList";

import TagModal from "../tag/tagModal";

// Redux slices
import { createHabit } from "./habitSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Title is required")
    .matches(
      /^[^\p{P}\p{S}]*$/u,
      "Name should only contain letters and spaces"
    ),
  description: Yup.string().matches(
    /^[^\p{P}\p{S}]*$/u,
    "Description should only contain letters and spaces"
  ),
  startDate: Yup.date().required("Start date is required"),
  repeat: Yup.number()
    .required("Repeat is required")
    .min(1, "Repeat must be at least 1")
    .integer("Repeat must be an integer"),
});

const defaultValues = {
  name: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs(),
  yearDate: dayjs(),
  reminder: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  counter: "weekly",
  repeat: 1,
  selectedDate: [],
  tags: [],
};

function PostForm() {
  const { user } = useAuth();
  const today = dayjs();

  const { isLoading } = useSelector((state) => state.habit);
  const [addTag, setAddTag] = useState([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = React.useState([]);
  const handleDayChange = (newSelectedDays) => {
    setSelectedDate(newSelectedDays);
  };

  const handleOpenTagModal = () => {
    setIsTagModalOpen(true);
  };
  const handleCloseTagModal = () => {
    setIsTagModalOpen(false);
  };

  const userId = user?._id;

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
    watch,
  } = methods;

  const dispatch = useDispatch();
  const counterValue = watch("counter");

  // Function to add a new tag to the state
  const handleNewTag = (newTagObject) => {
    setAddTag((prevTags) => [...prevTags, newTagObject]);
  };

  useEffect(() => {
    // This will update the 'tags' field in your form with the current addTag array
    setValue('tags', addTag);
  }, [addTag, setValue]);

  // Delete tag
  const handleDelete = (id) => {
    setAddTag((prevTags) => prevTags.filter((tag) => tag._id !== id))
  };

  const onSubmit = async (data) => {
    try {
      // Add the userId to the data object
      data.createdBy = userId;
      data.selectedDate = selectedDate;

      await dispatch(createHabit(data)).unwrap();
      reset();
      toast.success("Habit created successfully");
    } catch (error) {
      console.error("Failed to create habit:", error);
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
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Create Habit
        </Typography>
        <Stack spacing={2}>
          <FTextField
            name="name"
            multiline
            rows={1}
            label="Title"
            placeholder="Title: Drink 2 litres of water daily"
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
          <FRadioGroup
            name="counter"
            options={["weekly", "monthly", "yearly"]}
            defaultValue="weekly"
            label="Counter"
          />
          {counterValue === "weekly" && (
            <>
              <Typography variant="h6" gutterBottom>
                Date:
              </Typography>
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <FDatePicker
                name="startDate"
                helperText="MM/DD/YYYY"
                minDate={today}
                onChange={(date) => setStartDate(date)}
              />

              <InputLabel htmlFor="endDate">End Date</InputLabel>
              <FDatePicker
                name="endDate"
                helperText="MM/DD/YYYY"
                minDate={startDate}
              />

              <Tooltip title="Leave none for daily">
                <Typography variant="h6" gutterBottom>
                  Reminder
                </Typography>
              </Tooltip>
              <FMultiCheckbox
                name="reminder"
                options={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
              />
            </>
          )}
          {counterValue === "monthly" && (
            <>
              <DaysList onDayChange={handleDayChange} />
              <Typography variant="h6" gutterBottom>
                Repeat:
              </Typography>
              <FTextField
                name="repeat"
                label="Month(s)"
                type="number"
                onKeyPress={(event) => {
                  if (event.key === "e" || event.key === "E") {
                    event.preventDefault();
                  }
                }}
              />
            </>
          )}
          {counterValue === "yearly" && (
            <>
              <Typography variant="h6" gutterBottom>
                Pick Your Date
              </Typography>
              <InputLabel htmlFor="yearDate">Date</InputLabel>
              <FDatePicker
                name="yearDate"
                helperText="MM/DD/YYYY"
                views={["day", "month"]}
              />
              <Typography variant="h6" gutterBottom>
                Repeat:
              </Typography>
              <FTextField
                name="repeat"
                label="Year(s)"
                type="number"
                onKeyPress={(event) => {
                  if (event.key === "e" || event.key === "E") {
                    event.preventDefault();
                  }
                }}
              />
            </>
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

export default PostForm;
