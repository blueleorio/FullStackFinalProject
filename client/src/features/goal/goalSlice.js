import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  goals: [],
  currentGoal: null,
  isLoading: false,
  currentPage: 1,
  totalGoals: 0,
  status: "idle",
  error: null,
};

export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (page = 1) => {
    try {
      const response = await apiService.get(`/goals?page=${page}`);
      const { goals, totalGoals } = response;
      return { goals, totalGoals };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createGoal = createAsyncThunk("goals/createGoal", async (goal) => {
  console.log("🚀 ~ createGoal ~ goalSlice:", goal);
  const response = await apiService.post("/goals", goal);
  console.log("🚀 ~ createGoal ~ response - goalSlice:", response);
  return response.data;
});

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ id, updates }) => {
    const response = await apiService.put(`/goals/${id}`, updates);
    return response.data;
  }
);

export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (id) => {
  await apiService.delete(`/goals/${id}`);
  return id;
});

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.goals = action.payload.goals;
        state.totalGoals = action.payload.totalGoals;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        console.log(
          "🚀 ~ .addCase ~ action.payload - goalSlice:",
          action.payload
        );
        state.goals.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const { id, ...updates } = action.payload;
        const goalIndex = state.goals.findIndex((goal) => goal._id === id);
        if (goalIndex !== -1) {
          state.goals[goalIndex] = {
            ...state.goals[goalIndex],
            ...updates,
          };
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      });
  },
});

export const { setCurrentPage } = goalSlice.actions;

export default goalSlice.reducer;
