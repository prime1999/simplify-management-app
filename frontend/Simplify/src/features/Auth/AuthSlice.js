import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  users: null,
  user: user ? user : null,
  userList: [],
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      // await on the register function in the auth service component
      return await authService.register(userData);
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

// log user in
export const logUserIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      // await on the register function in the auth service component
      return await authService.logUserIn(userData);
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

// get all users
export const getUsers = createAsyncThunk("auth/users", async (_, thunkAPI) => {
  try {
    // get the token from the user in the auth state
    const token = thunkAPI.getState().auth.user.token;

    // await on the get users function in the auth service component
    return await authService.getUsers(token);
  } catch (error) {
    // assign an error value if there is one in any of the listed error value holders below
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // return the errror message using the thunkapi rejectwithvalue
    return thunkAPI.rejectWithValue(message);
  }
});

// ----------------------------- function to search for a user -------------------- //
export const searchUser = createAsyncThunk(
  "auth/searchUser",
  async (user, thunkAPI) => {
    try {
      // get the token from the user in the auth state
      const token = thunkAPI.getState().auth.user.token;

      // await on the search for a user function in the auth service component
      return await authService.searchUser(user, token);
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

// log user out
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// ------------------------------------- function to select user ------------------------ //
export const selectUser = createAsyncThunk(
  "auth/selectUser",
  (user) => {
    //const userList = thunkAPI.getState().auth.userList.slice(); // Make a copy of the current userList
    return user
  }
);

// ------------------------------------- function to remove a selected user ------------------------ //
export const removeSelectedUser = createAsyncThunk(
  "auth/removeSelectedUser",
  (userId) => {
    return userId
  }
);

// create the slice (auth slice)
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builders) => {
    builders
      // for user registration
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // for user log in
      .addCase(logUserIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logUserIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      // for getting all users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = null;
        state.message = action.payload;
      })
      // for searching for a user
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = null;
        state.message = action.payload;
      })
      // for selecting a user
      .addCase(selectUser.fulfilled, (state, action) => {
        state.userList.push(action.payload);
      })
      // for removing a selected user
      .addCase(removeSelectedUser.fulfilled, (state, action) => {
        state.userList = state.userList.filter(user => user._id !== action.payload);
      })
      // for log out
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
