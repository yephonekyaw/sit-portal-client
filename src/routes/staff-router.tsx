import StaffApp from "@/apps/staff-app";
import { UploadStudentsPage } from "@/pages/staff/upload-students-page";

const staffRouter = [
  {
    path: "",
    element: <StaffApp />,
    children: [
      {
        path: "upload-students",
        element: <UploadStudentsPage />,
      }
    ]
  },
];

export default staffRouter;
