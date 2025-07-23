import StaffApp from "@/apps/staff-app";
import DashboardBaseLayout from "@/pages/staff/dashboard-base-layout";
import CertificatesPage from "@/pages/staff/certificates-page";
import DataImportPage from "@/pages/staff/data-import-page";
import ProgramFormPage from "@/pages/staff/prog-form-page";
import ProgramRequirementFormPage from "@/pages/staff/prog-reqs-form-page";
import ProgramRequirementsPage from "@/pages/staff/prog-reqs-page";
import ProgramsPage from "@/pages/staff/programs-page";
import SchedulesPage from "@/pages/staff/schedules-page";
import SubmissionsPage from "@/pages/staff/submissions-page";

const staffRouter = [
  {
    path: "",
    element: <StaffApp />,
    children: [
      {
        path: "student-management",
        children: [
          {
            path: "data-import",
            element: <DataImportPage />,
          },
          {
            path: "submissions",
            element: <SubmissionsPage />,
          },
          {
            path: "submissions/:academicYear",
            element: <SubmissionsPage />,
          },
          {
            path: "submissions/:academicYear/:requirementSchedule",
            element: <SubmissionsPage />,
          },
          {
            path: "dashboard",
            element: <DashboardBaseLayout />,
            children: [
              {
                path: "programs",
                element: <ProgramsPage />,
              },
              {
                path: "programs/new",
                element: <ProgramFormPage />,
              },
              {
                path: "programs/edit/:programId",
                element: <ProgramFormPage />,
              },
              {
                path: "certificates",
                element: <CertificatesPage />,
              },
              {
                path: "requirements",
                element: <ProgramRequirementsPage />,
              },
              {
                path: "requirements/new",
                element: <ProgramRequirementFormPage />,
              },
              {
                path: "requirements/edit/:requirementId",
                element: <ProgramRequirementFormPage />,
              },
              {
                path: "schedules",
                element: <SchedulesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default staffRouter;
