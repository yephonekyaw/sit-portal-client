import StaffApp from "@/apps/staff-app";
import DashboardBaseLayout from "@/pages/staff/dashboard-base-layout";
import CertificatesPage from "@/pages/staff/certificates-page";
import DataImportPage from "@/pages/staff/data-import-page";
import ProgramFormPage from "@/pages/staff/prog-form-page";
import ProgramRequirementFormPage from "@/pages/staff/prog-reqs-form-page";
import ProgramRequirementsPage from "@/pages/staff/prog-reqs-page";
import ProgramsPage from "@/pages/staff/programs-page";
import SchedulesPage from "@/pages/staff/schedules-page";
import ScheduleFormPage from "@/pages/staff/schedule-form-page";
import SubmissionsPage from "@/pages/staff/submissions-page";
import StaffPage from "@/pages/staff/staff-page";
import StaffFormPage from "@/pages/staff/staff-form-page";
import RouteProtect from "@/middlewares/route-protect";
import CertificateFormPage from "@/pages/staff/cert-form-page";

const staffRouter = [
  {
    path: "",
    element: (
      <RouteProtect types={["staff"]}>
        <StaffApp />
      </RouteProtect>
    ),
    children: [
      {
        path: "staff-management",
        element: <StaffPage />,
      },
      {
        path: "staff-management/new",
        element: <StaffFormPage />,
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
        path: "certificates/edit/:certificateId",
        element: <CertificateFormPage />,
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
        path: "schedules/new",
        element: <ScheduleFormPage />,
      },
      {
        path: "schedules/edit/:scheduleId",
        element: <ScheduleFormPage />,
      },
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
                path: "schedules",
                element: <SchedulesPage />,
              },
              {
                path: "programs",
                element: <ProgramsPage />,
              },
              {
                path: "certificates",
                element: <CertificatesPage />,
              },
              {
                path: "requirements",
                element: <ProgramRequirementsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default staffRouter;
