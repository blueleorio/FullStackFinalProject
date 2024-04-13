import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  tags: [],
};

const slice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    fetchTagsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tags = action.payload;
    },
  },
});

export default slice.reducer;

export const fetchTags = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/tags");
    console.log("🚀 ~ fetchTags ~ response:", response);
    dispatch(slice.actions.fetchTagsSuccess(response.data));
    toast.success("Fetch tags successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
