import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import About from "../Components/About.tsx";
import CreateStudent from "../pages/admin/CreateStudent.tsx";
import CreateFaculty from "../pages/admin/CreateFaculty.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
  // absulute path
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
