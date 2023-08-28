import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import taskReducer from "../features/Tasks/TaskSlice";
import noteReducer from "../features/Notes/NotesSlice";
import projectReducer from "../features/Projects/ProjectSlice";
import teamReducer from "../features/Teams/TeamSlice";
import chatReducer from "../features/Chats/ChatSlice";
import messageReducer from "../features/Message/MessageSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tasks: taskReducer,
		notes: noteReducer,
		projects: projectReducer,
		teams: teamReducer,
		chats: chatReducer,
		messages: messageReducer,
	},
});
