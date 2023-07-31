import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./TaskService";

const initialState = {
  tasks: null,
  task: null,
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// get all the current users tasks
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(token);
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

//create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(token, taskData);
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

//get a single task
export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTask(token, id);
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

//search for a task
export const searchTask = createAsyncThunk(
  "tasks/searchTask",
  async (data, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.searchTask(token, data);
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

//get tasks based on there category
export const categorizeTask = createAsyncThunk(
  "tasks/categorizeTask",
  async (data, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.categorizeTask(token, data);
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

//update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ updatedData, id }, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(token, updatedData, id);
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

//delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      // await on the get tasks function in the task service component
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(token, id);
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

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {
    builders
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(searchTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(categorizeTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(categorizeTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(categorizeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.task = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tasks = state.tasks?.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
