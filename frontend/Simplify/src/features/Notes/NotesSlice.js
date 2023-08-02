import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./NotesService";

const initialState = {
  notes: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get notes
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(taskId, token);
    } catch (error) {
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

//create notes
export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async ({ taskId, note }, thunkAPI) => {
    console.log(note);
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return await noteService.createNotes(taskId, note, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      // return the errror message using the thunkapi rejectwithvalue
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
        state.isSuccess = true;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
