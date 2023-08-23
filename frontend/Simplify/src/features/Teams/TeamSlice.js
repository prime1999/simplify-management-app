import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import teamService from "./TeamService";

const initialState = {
  teams: null,
  team: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ------------------------------- function to get all teams created by current user --------------- //
export const getTeams = createAsyncThunk(
  "teams/getTeams",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // await on the get teams function in the team service component
      return await teamService.getTeams(token);
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
// ------------------------------- function to create a team --------------- //
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // await on the create teams function in the team service component
      return await teamService.createTeam(teamData, token);
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

// ------------------------------- function to get team assigned to a project --------------- //
export const getAssignedTeam = createAsyncThunk(
  "teams/getAssignedTeam",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // await on the get team assigned to a project from function in the team service component
      return await teamService.getAssignedTeam(projectId, token);
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

// ------------------------------- function to remove an assigned tem from a project --------------- //
export const removeAssignedTeam = createAsyncThunk(
  "teams/removeAssignedTeam",
  async (details, thunkAPI) => {
    console.log(details)
    try {
      const token = thunkAPI.getState().auth.user.token;
      // await on the remove assigned team to a project from function in the team service component
      return await teamService.removeAssignedTeam(details, token);
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

export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {
    builders
      // for getting teams
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // for create a team
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) 
      // for get team assigned to a project
      .addCase(getAssignedTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignedTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.team = action.payload;
      })
      .addCase(getAssignedTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // for remove assigned team to a project
      .addCase(removeAssignedTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAssignedTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(removeAssignedTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = teamSlice.actions;
export default teamSlice.reducer;
