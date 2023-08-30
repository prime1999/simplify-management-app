require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const notesRoute = require("./routes/notesRoutes");
const projectRouter = require("./routes/projectRoutes");
const teamRoute = require("./routes/teamRoutes");
const chatRoute = require("./routes/chatRoutes");
const messageRoute = require("./routes/messageRoutes");

//create express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable cors for all ROutes
app.use(cors());

app.use("/api/tasks", taskRoutes);

app.use("/api/user", userRoutes);

app.use("/api/notes", notesRoute);

app.use("/api/projects", projectRouter);

app.use("/api/teams", teamRoute);

app.use("/api/chats", chatRoute);

app.use("/api/message", messageRoute);

//connect to db
connectDb();

// middleware for handling errors
app.use(errorHandler);

//listen to request
const server = app.listen(process.env.PORT, () => {
	console.log(`listening to request on port ${process.env.PORT}`);
});

// initialize socket IO
const io = require("socket.io")(server, {
	// get the time it takes for a user to connect before the socket disconnects itsel t save band width
	pingTimeout: 6000,
	// set cors for the specified web address
	cors: {
		origin: "http://localhost:5173",
	},
});

io.on("connection", (socket) => {
	console.log("A user has connected");

	// create a private room for each users using there id
	socket.on("set-up", (userData) => {
		// add the user to the room with his/her Id
		socket.join(userData.id);
		console.log(userData.id);
		// emit a socket to alert the frontend that the user has joined a room
		socket.emit("connected");
	});

	// listen to a socket request from the fronted to add users to a chat room
	socket.on("join chat", (room) => {
		// create a room for the users of the chat and add them to the room
		socket.join(room);
		console.log(`User joined room ${room}`);
	});

	// socket to send a message
	socket.on("new message", (newMessageReceived) => {
		console.log(newMessageReceived.content);
		// save the chat from where the message is sent to this chat variable
		let chat = newMessageReceived.chat;

		// check if there is a user in this chat
		if (!chat.users) console.log("chat users not defined");

		// function to send the message to all other users of the chat except the message sender
		chat.users.forEach((user) => {
			console.log(user._id);
			// check if the the user is the sender
			if (user._id === newMessageReceived.sender._id) return;
			// but if not then send the message to the rooms of the user's id
			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});
});
