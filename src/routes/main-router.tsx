import App from "@/App";
import studentRouter from "./student-router";
import staffRouter from "./staff-router";

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
    ],
  },
];

export default mainRouter;
