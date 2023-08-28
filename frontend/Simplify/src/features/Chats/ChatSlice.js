import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./ChatService";

const initialState = {
	chats: null,
	selectedChat: null,
	isLoading: false,
	isSuccess: false,
	message: "",
	isError: false,
};

// --------------------------------- function to access a one one oe chat ------------------- //
export const accessChat = createAsyncThunk(
	"chats/accessChat",
	async (userId, thunkAPI) => {
		console.log(userId);
		try {
			// await on the access/create chat function in the chat service component
			const token = thunkAPI.getState().auth.user.token;
			return await chatService.accessChat(token, userId);
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

// --------------------------------- function to get all the user's chats ------------------- //
export const getUsersChats = createAsyncThunk(
	"chats/getUsersChat",
	async (_, thunkAPI) => {
		try {
			// await on the get user's chat function in the chat service component
			const token = thunkAPI.getState().auth.user.token;
			return await chatService.getUsersChat(token);
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

// --------------------------------- function to set the selected chat ------------------- //
export const setSelectedChat = createAsyncThunk(
	"chats/setSelectedChat",
	async (chat) => {
		return chat;
	}
);

export const chatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for accessing/creating a one on one chat
			.addCase(accessChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(accessChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.selectedChat = action.payload;
				state.isSuccess = true;
			})
			.addCase(accessChat.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			})
			// for getting all the user's chats
			.addCase(getUsersChats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsersChats.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.chats = action.payload;
			})
			.addCase(getUsersChats.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			})
			// for settinf the selected chat
			.addCase(setSelectedChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.selectedChat = action.payload;
			});
	},
});

export const { reset } = chatSlice.actions;

export default chatSlice.reducer;
