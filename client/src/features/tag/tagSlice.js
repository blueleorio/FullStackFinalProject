import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

// Async Thunks
export const fetchTags = createAsyncThunk("tag/getTags", async () => {
  const response = await apiService.get("/tags");
  return response.data;
});

export const createTag = createAsyncThunk("tag/createTag", async (tag) => {
  const response = await apiService.post("/tags", tag);
  return response.data;
});

export const deleteTag = createAsyncThunk("tag/deleteTag", async (tagId) => {
  await apiService.delete(`/tags/${tagId}`);
  return tagId;
});

export const fetchTagWithHabitGoal = createAsyncThunk("tag/fetchTagWithHabitGoal", async (tagId) => {
  const response = await apiService.get(`/tags/${tagId}/habits-goals`);
  return response.data;
});

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    isLoading: false,
    error: null,
    tags: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags.push(action.payload);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTagWithHabitGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTagWithHabitGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTagWithHabitGoal.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default tagSlice.reducer;
