import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment.tsx";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty.tsx";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester.tsx";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment.tsx";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty.tsx";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import Courses from "../pages/admin/courseManagement/Courses.tsx";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse.tsx";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse.tsx";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses.tsx";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters.tsx";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration.tsx";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin.tsx";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty.tsx";
import CreateStudent from "../pages/admin/userManagement/CreateStudent.tsx";
import FacultyData from "../pages/admin/userManagement/FacultyData.tsx";
import StudentData from "../pages/admin/userManagement/StudentData.tsx";
import StudentDetails from "../pages/admin/userManagement/StudentDetails.tsx";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
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
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Faculties",
        path: "faculties-data",
        element: <FacultyData />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
];
