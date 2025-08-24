import StudentApp from "@/apps/student-app";
import RouteProtect from "@/middlewares/route-protect";
import RequirementPage from "@/pages/student/requirements-page";

const studentRouter = [
  {
    path: "",
    element: (
      <RouteProtect types={["student"]}>
        <StudentApp />
      </RouteProtect>
    ),
    children: [
      {
        path: "student/requirements",
        element: <RequirementPage />,
      },
    ],
  },
];

export default studentRouter;
