import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import taskReducer from "../features/Tasks/TaskSlice";
import noteReducer from "../features/Notes/NotesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    notes: noteReducer,
  },
});
