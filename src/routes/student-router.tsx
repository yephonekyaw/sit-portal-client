import StudentApp from "@/apps/student-app";
import RouteProtect from "@/middlewares/route-protect";
import NotFoundPage from "@/pages/not-found-page";
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
        index: true,
        element: <NotFoundPage />,
      },
      {
        path: "requirements",
        element: <RequirementPage />,
      },
    ],
  },
];

export default studentRouter;
