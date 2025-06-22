import StudentApp from "@/apps/student-app";
import LoginPage from "@/pages/login-page";

const studentRouter = [
  {
    path: "",
    element: <StudentApp />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

export default studentRouter;
