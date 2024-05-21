import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  progresses: [],
  isLoading: false,
  status: "idle",
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
  async () => {
    try {
      const response = await apiService.get(`/progresses`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

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
      });
  },
});

export default progressSlice.reducer;
