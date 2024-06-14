import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import tagReducer from "../features/tag/tagSlice";
import habitReducer from "../features/habit/habitSlice";
import progressReducer from "../features/progress/progressSlice";
import goalReducer from "../features/goal/goalSlice";

const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  habit: habitReducer,
  progress: progressReducer,
  goal: goalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
