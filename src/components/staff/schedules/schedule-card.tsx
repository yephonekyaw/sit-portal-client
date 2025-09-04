import type { GetSchedulesItem } from "@/services/staff/schedules/types";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import { CardContent } from "@/components/ui/card";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { Hash, Clock, GraduationCap, CalendarDays } from "lucide-react";
import { isDeadlinePassed } from "@/utils/staff/dashboard.utils";
import { formatDate } from "@/utils/common.utils";
import { useNavigate } from "react-router-dom";

const ScheduleCard = ({ schedule }: { schedule: GetSchedulesItem }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/staff/schedules/edit/${schedule.id}`);
  };

  const handleVerify = () => {
    navigate(
      `/staff/student-management/submissions/${schedule.academicYear}/${schedule.id}`
    );
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={schedule.requirementName}
        codes={[schedule.certCode, schedule.programCode]}
        isActive={!isDeadlinePassed(schedule.submissionDeadline)}
        onEdit={handleEdit}
        onClickVerify={handleVerify}
      />
      <CardContent className="pt-0 space-y-6">
        <CardInfoSection>
          <CardInfoItem
            icon={Hash}
            label="Schedule ID"
            value={`${schedule.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={Clock}
            label="Submission Deadline"
            value={formatDate(schedule.submissionDeadline, {})}
          />
          <CardInfoItem
            icon={GraduationCap}
            label="Program Name"
            value={schedule.programName}
          />
          <CardInfoItem
            icon={CalendarDays}
            label="Academic Year"
            value={schedule.academicYear.toString()}
          />
        </CardInfoSection>
        <CardFooter
          createdAt={schedule.createdAt}
          updatedAt={schedule.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
};

export default ScheduleCard;
