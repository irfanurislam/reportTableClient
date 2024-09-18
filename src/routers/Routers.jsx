import { createBrowserRouter } from "react-router-dom";

import Main from "../components/layouts/Main";
import Home from "../pages/Home";
import ReportPage from "../pages/ReportPage";
import GenerateReport from "../pages/GenerateReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allReports",
        element: <ReportPage />,
      },
      {
        path: "/generates",
        element: <GenerateReport />,
      },
    ],
  },
]);
