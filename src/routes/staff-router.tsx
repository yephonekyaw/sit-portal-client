import StaffApp from "@/apps/staff-app";
import CentralDashboardPage from "@/pages/staff/central-dashboard-page";
import DataImportPage from "@/pages/staff/data-import-page";

const staffRouter = [
  {
    path: "",
    element: <StaffApp />,
    children: [
      {
        path: "student-management/central-dashboard",
        element: <CentralDashboardPage />,
      },
      {
        path: "student-management/data-import",
        element: <DataImportPage />,
      },
    ],
  },
];

export default staffRouter;
