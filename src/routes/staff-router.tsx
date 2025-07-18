import StaffApp from "@/apps/staff-app";
import StudentDataImportPage from "@/pages/staff/student-data-import-page";
import StudentProgramRequirementPage from "@/pages/staff/student-program-requirement-page";

const staffRouter = [
  {
    path: "",
    element: <StaffApp />,
    children: [
      {
        path: "student-management/data-import",
        element: <StudentDataImportPage />,
      },
      {
        path: "student-management/program-requirements",
        element: <StudentProgramRequirementPage />,
      },
    ],
  },
];

export default staffRouter;
