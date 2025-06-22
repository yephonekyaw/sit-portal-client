import StudentApp from "@/apps/student-app";
import StudentDashboard from "@/pages/student/dashboard-page";

const studentRouter = [
  {
    path: "",
    element: <StudentApp />,
    children: [
      {
        path: "",
        element: <StudentDashboard />,
      },
    ],
  },
];

export default studentRouter;
