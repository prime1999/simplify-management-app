import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./ProjectService";

const initialState = {
  projects: null,
  project: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// ------------------------------ create a new project ----------------------------------- //
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, thunkAPI) => {
    try {
      // await on the create project function in the project service component
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.createProject(token, projectData);
    } catch (error) {
      // assign an error value if there is one in any of the listed error value holders below
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return the errror message using the thunkapi rejectwithvalue
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------ get user's projects ----------------------------------- //
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      // await on the create project function in the project service component
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getProjects(token);
    } catch (error) {
      // assign an error value if there is one in any of the listed error value holders below
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return the errror message using the thunkapi rejectwithvalue
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------ assign a team to project ----------------------------------- //
export const assignTeam = createAsyncThunk(
  "projects/assignTeam",
  async (details, thunkAPI) => {
    try {
      // await on the assign team function in the project service component
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.assignTeam(token, details);
    } catch (error) {
      // assign an error value if there is one in any of the listed error value holders below
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // return the errror message using the thunkapi rejectwithvalue
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {
    builders
      // create project
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get projects
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // assign a team
      .addCase(assignTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(assignTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
