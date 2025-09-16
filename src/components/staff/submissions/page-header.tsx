import {
  CheckCircle,
  UserCheck,
  BarChart3,
  Calendar,
  FileText,
  GraduationCap,
  Award,
  Clock,
  UserX,
} from "lucide-react";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { formatDate } from "@/utils/common.utils";
import InfoBadge from "./info-badge";

const PageHeader = () => {
  const { currentTab, setCurrentTab, submissionRelatedDetail } =
    useSubmissionStore();

  const tabs = [
    { value: "submitted", label: "Submitted", icon: UserCheck },
    { value: "not_submitted", label: "Not Submitted", icon: UserX },
    { value: "stats", label: "Statistics", icon: BarChart3 },
  ] as const;

  return (
    <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6 space-y-6">
      {/* Title section and tabs - responsive layout */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Title section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-blue-900">Submissions</h1>
            <p className="mt-1 text-sm text-gray-600">
              View and manage all student submissions for the program
              requirements.
            </p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex bg-white rounded-full p-0.5 border border-blue-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setCurrentTab(tab.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentTab === tab.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info badges section */}
      {submissionRelatedDetail && (
        <div className="flex gap-3 flex-wrap">
          <InfoBadge
            icon={FileText}
            name="Requirement"
            value={submissionRelatedDetail.requirementName}
          />
          <InfoBadge
            icon={GraduationCap}
            name="Program"
            value={submissionRelatedDetail.programCode}
          />
          <InfoBadge
            icon={Award}
            name="Certificate"
            value={submissionRelatedDetail.certCode}
          />
          <InfoBadge
            icon={Calendar}
            name="Target Year"
            value={submissionRelatedDetail.targetYear.toString()}
          />
          <InfoBadge
            icon={Clock}
            name="Deadline"
            value={formatDate(submissionRelatedDetail.submissionDeadline, {})}
          />
        </div>
      )}
    </header>
  );
};

export default PageHeader;
