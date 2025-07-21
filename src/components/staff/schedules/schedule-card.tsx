import type { Schedule } from "@/mock/schedules.mock";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import { CardContent } from "@/components/ui/card";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { Hash, Clock, GraduationCap, CalendarDays } from "lucide-react";
import { isDeadlinePassed } from "@/utils/staff/dashboard.utils";
import { formatDate } from "@/utils/shared.utils";

const ScheduleCard = ({ schedule }: { schedule: Schedule }) => {
  return (
    <CardBase>
      <CardHeaderSection
        title={schedule.program_requirement.name}
        codes={[schedule.certificate_type.code, schedule.program.program_code]}
        isActive={!isDeadlinePassed(schedule.submission_deadline)}
        onClickVerify={() => console.log("Verify clicked")}
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
            value={formatDate(schedule.submission_deadline, {})}
          />
          <CardInfoItem
            icon={GraduationCap}
            label="Program Name"
            value={schedule.program.program_name}
          />
          <CardInfoItem
            icon={CalendarDays}
            label="Academic Year"
            value={schedule.academic_year.year_code}
          />
        </CardInfoSection>
        <CardFooter
          createdAt={schedule.created_at}
          updatedAt={schedule.updated_at}
        />
      </CardContent>
    </CardBase>
  );
};

export default ScheduleCard;
