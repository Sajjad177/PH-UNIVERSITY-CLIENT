import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import FacultyOfferedCourse from "../pages/faculty/FacultyOfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Courses",
    path: "offered-courses",
    element: <FacultyOfferedCourse />,
  },
];
