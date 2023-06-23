import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/getting-started" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
    </>
  )
);

function App() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
