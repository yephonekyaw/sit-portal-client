import StudentApp from "@/apps/student-app";
import CertificateSubmissionsPage from "@/pages/student/certificate-submissions-page";

const studentRouter = [
  {
    path: "",
    element: <StudentApp />,
    children: [
      {
        path: "student/certificate-submission",
        element: <CertificateSubmissionsPage />,
      },
    ],
  },
];

export default studentRouter;
