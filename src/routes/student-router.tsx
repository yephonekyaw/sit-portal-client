import StudentApp from "@/apps/student-app";
import RouteProtect from "@/middlewares/route-protect";
import CertificateSubmissionsPage from "@/pages/student/certificate-submissions-page";

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
        path: "student/certificate-submission",
        element: <CertificateSubmissionsPage />,
      },
    ],
  },
];

export default studentRouter;
