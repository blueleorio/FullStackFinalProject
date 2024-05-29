import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  progresses: [],
  isLoading: false,
  status: "idle",
  currentPage: 1,
  totalProgresses: 0,
  currentProgress: null,
  error: null,
};

export const fetchProgressesById = createAsyncThunk(
  "progresses/fetchProgressesById",
  async (habitId) => {
    try {
      const response = await apiService.get(`/progresses?habitId=${habitId}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchProgresses = createAsyncThunk(
  "progresses/fetchProgresses",
  async (page = 1) => {
    try {
      const response = await apiService.get(`/progresses?page=${page}`);

      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);
export const fetchProgressesForDate = createAsyncThunk(
  "progresses/fetchProgressesForDate",
  async (date) => {
    const url = `/progresses/date/${date}`;
    // console.log(`Making GET request to: ${url}`);
    try {
      const response = await apiService.get(url);
      console.log("🚀 ~ file: progressSlice.js:45 ~ response:", response);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progresses/updateProgress",
  async ({ id, updates }) => {
    console.log("🚀 ~ file: progressSlice.js:56 ~ id:", id);
    try {
      const response = await apiService.put(`/progresses/${id}`, updates);
      // console.log("🚀 ~ file: progressSlice.js:59 ~ response:", response);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

//! Reducer

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.progresses = action.payload;
      })
      .addCase(fetchProgresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProgressesById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgressesById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.progresses = action.payload;
      })
      .addCase(fetchProgressesById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProgressesForDate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgressesForDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.progresses = action.payload;
      })
      .addCase(fetchProgressesForDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProgress = action.payload;
      });
  },
});
export const { setCurrentPage } = progressSlice.actions;

export default progressSlice.reducer;
