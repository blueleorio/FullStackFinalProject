// Libraries
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";

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
  FUploadImage,
  FDatePicker,
  FMultiCheckbox,
  FRadioGroup,
} from "../../components/form";
import TagModal from "../tag/tagModal";

// Redux slices
import { createHabit } from "./habitSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  description: Yup.string().default(""),
  startDate: Yup.date().required("Start date is required"),
});

const defaultValues = {
  name: "",
  description: "",
  startDate: dayjs(),
  endDate: dayjs(),
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
};

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

function PostForm() {
  const { user } = useAuth();

  const { isLoading } = useSelector((state) => state.habit);
  const tags = useSelector((state) => state.tag.tags);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  // const [reminderValue, setReminderValue] = useState("");
  // console.log("🚀 ~ PostForm ~ isLoading:", isLoading);
  const handleOpenTagModal = () => {
    setIsTagModalOpen(true);
  };
  const handleCloseTagModal = () => {
    setIsTagModalOpen(false);
  };

  const userId = user?._id;
  // console.log("🚀 ~ PostForm ~ userId:", userId);

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
  const dispatch = useDispatch();

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
    console.log("🚀 ~ onSubmit ~ data: HabitForm.js", data);
    try {
      // Add the userId to the data object
      data.createdBy = userId;
      // console.log("Testing create Habit - habit Form.js", data);
      await dispatch(createHabit(data)).unwrap();
      reset();
    } catch (error) {
      console.error("Failed to create habit:", error);
      // Here you can handle the error, for example, by showing an error message to the user
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
          Create Habit
        </Typography>
        <Stack spacing={2}>
          <FTextField
            name="name"
            multiline
            fullWidth
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
          <FDatePicker name="startDate" helperText="MM/DD/YYYY" />

          <InputLabel htmlFor="endDate">End Date</InputLabel>
          <FDatePicker name="endDate" helperText="MM/DD/YYYY" />

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
          <FRadioGroup
            name="counter"
            options={["weekly", "monthly", "yearly"]}
            defaultValue="weekly"
            label="Counter"
          />
          <Stack direction="row" spacing={1} justifyContent="space-between">
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

export default PostForm;
