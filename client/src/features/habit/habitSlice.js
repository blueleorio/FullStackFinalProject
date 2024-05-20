import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
// import { getUser } from "../features/user/userSlice";

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
  async (page = 1) => {
    try {
      const response = await apiService.get(`/habits?page=${page}`);
      // Extract the data from the response
      // console.log("🚀 ~ response.data from HABIT SLICE FETCH HABIT:", response);
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

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit) => {
    console.log("🚀 ~ habit - SLICE:", habit);

    const response = await apiService.post("/habits", habit);
    return response.data;
  }
);

export const updateHabit = createAsyncThunk(
  "habits/updateHabit",
  async ({ id, updates }) => {
    const response = await apiService.put(`/habits/${id}`, updates);

    console.log("🚀~ Habit Slice ~ response:", response);
    return response.data;
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async (id) => {
    await apiService.delete(`/habits/${id}`);
    return id;
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
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
        state.loading = true;
        state.error = null;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);

        // console.log(
        //   "🚀 ~ .addCase ~ action.payload: - habitSlice.js",
        //   action.payload
        // );
        state.loading = false;
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.loading = false;
        // console.log("🚀 ~ .rejected ~ action.payload:", action.payload);
        state.error = action.error.message;
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const { id, ...updates } = action.payload;
        // console.log(
        //   "🚀 ~ habitSLice - updateHabit ~ action.payload:",
        //   action.payload
        // );
        const habitIndex = state.habits.findIndex((habit) => habit._id === id);
        if (habitIndex !== -1) {
          state.habits[habitIndex] = {
            ...state.habits[habitIndex],
            ...updates,
          };
        }
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
