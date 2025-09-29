import App from "@/App";
import studentRouter from "./student-router";
import staffRouter from "./staff-router";
import NotFoundPage from "@/pages/not-found-page";

const mainRouter = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <NotFoundPage />,
      },
      {
        path: "/student",
        children: studentRouter,
      },
      {
        path: "/staff",
        children: staffRouter,
      },
      // {
      //   path: "/login",
      //   element: <LoginPage />,
      // },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default mainRouter;
