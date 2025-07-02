import StaffApp from "@/apps/staff-app";
import { StudentDataImportPage } from "@/pages/staff/student-data-import-page";

const staffRouter = [
  {
    path: "",
    element: <StaffApp />,
    children: [
      {
        path: "student-data-import",
        element: <StudentDataImportPage />,
      },
    ],
  },
];

export default staffRouter;
