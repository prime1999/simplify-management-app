import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import taskReducer from "../features/Tasks/TaskSlice";
import noteReducer from "../features/Notes/NotesSlice";
import projectReducer from "../features/Projects/ProjectSlice";
import teamReducer from "../features/Teams/TeamSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    notes: noteReducer,
    projects: projectReducer,
    teams: teamReducer,
  },
});
