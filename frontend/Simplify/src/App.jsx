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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
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
