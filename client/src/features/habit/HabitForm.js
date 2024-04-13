import React, { useCallback } from "react";
import {
  Box,
  Card,
  alpha,
  Stack,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {
  FormProvider,
  FTextField,
  FUploadImage,
  FRadioGroup,
} from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { createPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

function PostForm() {
  const { isLoading } = useSelector((state) => state.post);

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
  const handleAddTag = () => {
    console.info("You clicked the add tag icon.");
  };

  const onSubmit = (data) => {
    // dispatch(createPost(data)).then(() => reset());
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
            name="tittle"
            multiline
            fullWidth
            rows={1}
            label="Tittle"
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
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Typography variant="h6" gutterBottom>
            Difficulty
          </Typography>
          <FRadioGroup
            name="difficulty"
            options={["Easy", "Medium", "Hard", "Expert"]}
          />
          <Typography variant="h6" gutterBottom>
            Counter
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              Tag:
            </Typography>
            <Chip
              label="Clickable Deletable"
              color="primary"
              onClick={handleClick}
              onDelete={handleDelete}
            />
            <IconButton
              color="primary"
              aria-label="add tag"
              component="span"
              onClick={handleAddTag}
            >
              <AddIcon />
            </IconButton>
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
              size="small"
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
