import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./pages/Tasks";
import TasksCategories from "./pages/TasksCategories";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import Projects from "./pages/Projects/Projects";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* explore route */}
			<Route path="/" element={<RootLayout />}>
				<Route path="/" element={<PrivateRoute />}>
					<Route index element={<Dashboard />} />
					{/* tasks route */}
					<Route path="/tasks" element={<PrivateRoute />}>
						<Route path="/tasks" element={<Tasks />} />
					</Route>
					{/* tasks category route */}
					<Route path="/tasks/category/:value" element={<PrivateRoute />}>
						<Route
							path="/tasks/category/:value"
							element={<TasksCategories />}
						/>
					</Route>
					{/* adding task route */}
					<Route path="/add-task" element={<PrivateRoute />}>
						<Route path="/add-task" element={<AddTask />} />
					</Route>
					{/* update task route */}
					<Route path="/update-task/:taskId" element={<PrivateRoute />}>
						<Route path="/update-task/:taskId" element={<UpdateTask />} />
					</Route>
					{/* -------- routes for project ---------- */}
					{/* projects route */}
					<Route path="/projects" element={<PrivateRoute />}>
						<Route path="/projects" element={<Projects />} />
					</Route>
				</Route>
			</Route>
			{/* Authorization route */}
			<Route path="/getting-started" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<LogIn />} />
		</>
	)
);

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: "rgb(0, 0, 255)", // Set your desired primary color
			},
			neon: {
				main: "#63E9F8",
			},
			navy: {
				main: "rgb(0, 0, 128)",
			},
		},
	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
			<ToastContainer />
		</>
	);
}

export default App;
