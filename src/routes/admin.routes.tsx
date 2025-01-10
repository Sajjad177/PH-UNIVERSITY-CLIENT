import CreateStudent from "../pages/admin/CreateStudent.tsx";
import CreateFaculty from "../pages/admin/CreateFaculty.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import CreateAdmin from "../pages/admin/CreateAdmin.tsx";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

