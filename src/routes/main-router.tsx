import App from "@/App";
import StaffApp from "@/app/staff-app";
import StudentApp from "@/app/student-app";

const main_router = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/student",
        element: <StudentApp />,
      },
      {
        path: "/staff",
        element: <StaffApp />,
      },
    ],
  },
];

export default main_router;
