import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "../App";
import Main from "../components/layouts/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path: "/allReports",
        element: <App></App>,
      },
      {
        path: "/generates",
        element: <App></App>,
      },
    ],
  },
]);
