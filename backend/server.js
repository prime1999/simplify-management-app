require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

//create express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable cors for all ROutes
app.use(cors());

app.use("/api/tasks", taskRoutes);

app.use("/api/user", userRoutes);

//connect to db
connectDb();

// middleware for handling errors
app.use(errorHandler);

//listen to request
app.listen(process.env.PORT, () => {
  console.log(`listening to request on port ${process.env.PORT}`);
});
