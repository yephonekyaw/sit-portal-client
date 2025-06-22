import App from "@/App";
import studentRouter from "./student-router";
import staffRouter from "./staff-router";
import LoginPage from "@/pages/login-page";

const mainRouter = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        children: studentRouter,
      },
      {
        path: "/staff",
        children: staffRouter,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];

export default mainRouter;
