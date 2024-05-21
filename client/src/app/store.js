import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import friendReducer from "../features/friend/friendSlice";
import tagReducer from "../features/tag/tagSlice";
import habitReducer from "../features/habit/habitSlice";
import progressReducer from "../features/progress/progressSlice";
import goalReducer from "../features/goal/goalSlice";

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  friend: friendReducer,
  tag: tagReducer,
  habit: habitReducer,
  progress: progressReducer,
  goal: goalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
