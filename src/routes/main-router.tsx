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
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export default mainRouter;
