import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./MessageService";

const initialState = {
	messages: null,
	message: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

// ----------------------------------- function for sending a message -------------------------------- //
export const sendMessage = createAsyncThunk(
	"messages/sendMessage",
	async (messageDetails, thunkAPI) => {
		try {
			// await on the send message function in the message service component
			const token = thunkAPI.getState().auth.user.token;
			return await messageService.sendMessage(messageDetails, token);
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

// ----------------------------------- function to fetch all messages of a chat -------------------------------- //
export const fetchMessages = createAsyncThunk(
	"messages/fetchMessages",
	async (chatId, thunkAPI) => {
		try {
			// await on the fetch messages function in the message service component
			const token = thunkAPI.getState().auth.user.token;
			return await messageService.fetchMessages(chatId, token);
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

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builders) => {
		builders
			// for send a message
			.addCase(sendMessage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendMessage.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			})
			// for fetching messages
			.addCase(fetchMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.messages = action.payload;
			})
			.addCase(fetchMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = messageSlice.actions;

export default messageSlice.reducer;
