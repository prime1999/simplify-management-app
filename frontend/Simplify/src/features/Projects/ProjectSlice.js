import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: null,
  project: null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {},
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
