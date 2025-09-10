import { Card, CardContent } from "@/components/ui/card";
import DefaultLoader from "@/components/ui/default-loader";
import { useGetDashboardStatsByScheduleId } from "@/services/staff/dashboard-stats/queries";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { formatDate } from "@/utils/common.utils";
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const DashboardStats = () => {
  const { submissionRelatedDetail } = useSubmissionStore();
  const {
    data: dashboardStats,
    isLoading,
    error,
  } = useGetDashboardStatsByScheduleId(
    submissionRelatedDetail?.scheduleId || null
  );

  if (isLoading) {
    return <DefaultLoader label="Loading stats..." />;
  }

  if (error || !dashboardStats?.data) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Unable to load stats</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = dashboardStats.data;
  const submissionRate =
    stats.totalSubmissionsRequired > 0
      ? (stats.submittedCount / stats.totalSubmissionsRequired) * 100
      : 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Required Submissions */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Required Submissions
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.totalSubmissionsRequired}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-blue-400"
                    style={{ width: `${submissionRate}%` }}
                  ></div>
                  <div
                    className="bg-gray-300"
                    style={{ width: `${100 - submissionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Submitted
                    </span>
                  </div>
                  <span className="text-base font-semibold text-blue-600">
                    {stats.submittedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Not Submitted
                    </span>
                  </div>
                  <span className="text-base font-semibold text-gray-600">
                    {stats.notSubmittedCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Status */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Submission Status
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.submittedCount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-green-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.approvedCount / stats.submittedCount) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-amber-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.pendingCount / stats.submittedCount) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.rejectedCount / stats.submittedCount) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-purple-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.manualReviewCount / stats.submittedCount) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Approved
                    </span>
                  </div>
                  <span className="text-base font-semibold text-green-600">
                    {stats.approvedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Pending
                    </span>
                  </div>
                  <span className="text-base font-semibold text-amber-600">
                    {stats.pendingCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Rejected
                    </span>
                  </div>
                  <span className="text-base font-semibold text-red-600">
                    {stats.rejectedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Manual Review
                    </span>
                  </div>
                  <span className="text-base font-semibold text-purple-600">
                    {stats.manualReviewCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Method */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Verification Method
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.approvedCount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-purple-400"
                    style={{
                      width: `${
                        stats.approvedCount > 0
                          ? (stats.manualVerificationCount /
                              stats.approvedCount) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-blue-400"
                    style={{
                      width: `${
                        stats.approvedCount > 0
                          ? (stats.agentVerificationCount /
                              stats.approvedCount) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Manual
                    </span>
                  </div>
                  <span className="text-base font-semibold text-purple-600">
                    {stats.manualVerificationCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Agent</span>
                  </div>
                  <span className="text-base font-semibold text-blue-600">
                    {stats.agentVerificationCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Timing */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Submission Timing
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.submittedCount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-green-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.onTimeSubmissions / stats.submittedCount) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-amber-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.lateSubmissions / stats.submittedCount) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-400"
                    style={{
                      width: `${
                        stats.submittedCount > 0
                          ? (stats.overdueCount / stats.submittedCount) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      On Time
                    </span>
                  </div>
                  <span className="text-base font-semibold text-green-600">
                    {stats.onTimeSubmissions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Late</span>
                  </div>
                  <span className="text-base font-semibold text-amber-600">
                    {stats.lateSubmissions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Overdue
                    </span>
                  </div>
                  <span className="text-base font-semibold text-red-600">
                    {stats.overdueCount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Last Updated:{" "}
          {formatDate(stats.lastCalculatedAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
