import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  tags: [],
};

const slice = createSlice({
  name: "tag",
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

    createTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tags.push(action.payload);
    },

    deleteTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tags = state.tags.filter((tag) => tag.id !== action.payload);
    },
  },
});

export default slice.reducer;

export const fetchTags = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/tags");
    dispatch(slice.actions.fetchTagsSuccess(response.data));
    console.log("🚀 ~ fetchTags ~ response:", response);
    toast.success("Fetch tags successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createTag = (tag) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/tags", tag);
    dispatch(slice.actions.createTagSuccess(response.data));
    toast.success("Tag created successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteTag = (tagId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/tags/${tagId}`);
    dispatch(slice.actions.deleteTagSuccess(tagId));
    toast.success("Tag deleted successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
