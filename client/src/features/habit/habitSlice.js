import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  habits: [],
  currentHabit: null,
  status: "idle",
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await apiService.get("/habits");
  return response.data;
});

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit) => {
    const response = await apiService.post("/habits", habit);
    return response.data;
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
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const { id, ...updatedHabit } = action.payload;
        const existingHabit = state.habits.find((habit) => habit.id === id);
        if (existingHabit) {
          Object.assign(existingHabit, updatedHabit);
        }
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter(
          (habit) => habit.id !== action.payload
        );
      });
  },
});

export default habitSlice.reducer;