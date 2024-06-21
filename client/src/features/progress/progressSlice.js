import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  progresses: [],
  isLoading: false,
  status: "idle",
  currentPage: 1,
  totalProgresses: 0,
  currentDate: null,
  currentProgress: null,
  error: null,
};

export const fetchProgressesById = createAsyncThunk(
  "progresses/fetchProgressesById",
  async (habitId) => {
    try {
      const response = await apiService.get(`/progresses?habitId=${habitId}`);
      const { progresses, totalProgresses } = response;
      return { progresses, totalProgresses };
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
  async ({ date, page }) => {
    const url = `/progresses/date/${date}?page=${page}`;
    try {
      const response = await apiService.get(url);
      return response;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progresses/updateProgress",
  async ({ id, updates }) => {
    try {
      const response = await apiService.put(`/progresses/${id}`, updates);
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
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
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
        state.progresses = action.payload.data;
        state.totalProgresses = action.payload.totalProgresses;
        state.currentPage = 1;
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
export const { setCurrentPage, setCurrentDate } = progressSlice.actions;

export default progressSlice.reducer;
