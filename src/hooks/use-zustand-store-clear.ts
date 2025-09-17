import { useNotificationStore } from "@/stores/notification.stores";
import { useCertificateStore } from "@/stores/staff/certificate.stores";
import { useProgramRequirementStore } from "@/stores/staff/prog-req.stores";
import { useProgramStore } from "@/stores/staff/program.stores";
import { useScheduleStore } from "@/stores/staff/schedule.stores";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { useRequirementStore } from "@/stores/student/requirement.stores";

export const useZustandStoreClear = () => {
  const { clearCertificateStore } = useCertificateStore();
  const { clearProgramRequirementStore } = useProgramRequirementStore();
  const { clearProgramStore } = useProgramStore();
  const { clearScheduleStore } = useScheduleStore();
  const { clearSubmissionStore } = useSubmissionStore();
  const { clearRequirementStore } = useRequirementStore();
  const { clearNotificationStore } = useNotificationStore();

  const clearAllStores = () => {
    clearCertificateStore();
    clearProgramRequirementStore();
    clearProgramStore();
    clearScheduleStore();
    clearSubmissionStore();
    clearRequirementStore();
    clearNotificationStore();
  };
  return { clearAllStores };
};
