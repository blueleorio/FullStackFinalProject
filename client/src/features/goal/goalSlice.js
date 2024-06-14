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
  async ({ limit, page }) => {
    try {
      const response = await apiService.get(`/goals?page=${page}&limit=${limit}`);
      const { goals, totalGoals } = response;
      return { goals, totalGoals };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchGoalProgress = createAsyncThunk(
  "goals/fetchGoalProgress",
  async (goalId, { dispatch, getState }) => {
    try {
      const response = await apiService.get(`/goals/${goalId}/calculate`);
      dispatch(setPercentage({ goalId, percentage: response.percent }));
      return response;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const searchGoals = createAsyncThunk(
  "goals/searchGoals",
  async (name) => {
    try {
      const response = await apiService.get(`/goals/search?name=${name}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createGoal = createAsyncThunk("goals/createGoal", async (goal) => {
  try {
    const response = await apiService.post("/goals", goal);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
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
  reducers: {
    setPercentage: (state, action) => {
      const { goalId, percentage } = action.payload;
      const goal = state.goals.find((goal) => goal.id === goalId);
      if (goal) {
        goal.percentage = percentage;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
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
        state.goals.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
        state.isLoading = false;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      })
      .addCase(fetchGoalProgress.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchGoalProgress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
      })
      .addCase(fetchGoalProgress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setCurrentPage, setPercentage } = goalSlice.actions;

export default goalSlice.reducer;
