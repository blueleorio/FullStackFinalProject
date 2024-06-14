import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  habits: [],
  currentHabit: null,
  isLoading: false,
  currentPage: 1,
  totalHabits: 0,
  status: "idle",
  error: null,
};
export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async ({ limit, page }) => {
    try {
      const response = await apiService.get(`/habits?page=${page}&limit=${limit}`);
      // Extract the data from the response
      const { habits, totalHabits } = response;
      // Return the data as an object with `habits` and `totalHabits` properties
      return { habits, totalHabits };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchHabitsForDate = createAsyncThunk(
  "habits/fetchHabitsForDate",
  async (date) => {
    try {
      const response = await apiService.get(`/habits/date/${date}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const searchHabits = createAsyncThunk(
  "habits/searchHabits",
  async (name) => {
    try {
      const response = await apiService.get(`/habits/search?name=${name}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit) => {

    const response = await apiService.post("/habits", habit);
    // return response.data;
    return { habits: response.data, totalHabits: response.totalHabits };
  }
);

export const updateHabit = createAsyncThunk(
  "habits/updateHabit",
  async ({ id, updates }) => {
    const response = await apiService.put(`/habits/${id}`, updates);
    return response.data;
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async (id) => {
    const response = await apiService.delete(`/habits/${id}`);
    return response;
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.habits = action.payload.habits;
        state.totalHabits = action.payload.totalHabits;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchHabitsForDate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabitsForDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.habits = action.payload;
      })
      .addCase(fetchHabitsForDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload.habits);
        state.totalHabits = action.payload.totalHabits;
        state.isLoading = false;
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateHabit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const { id, ...updates } = action.payload;

        const habitIndex = state.habits.findIndex((habit) => habit._id === id);
        if (habitIndex !== -1) {
          state.habits[habitIndex] = {
            ...state.habits[habitIndex],
            ...updates,
          };
        }
        state.isLoading = false;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(
          (habit) => habit.id !== action.payload
        );
      });
  },
});
export const { setCurrentPage } = habitSlice.actions;

export default habitSlice.reducer;
