import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileCheck, Users } from "lucide-react";
import StatCard from "./stat-card";
import { STAT_CARD_COLOR_PALETTES } from "@/constants/staff/submission.constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSubmissionsFilters } from "@/stores/staff/submissions-filter.stores";
import {
  useDashboardStats,
  useDashboardStatsFilters,
} from "@/stores/staff/dashboard-stats.stores";
import { useEffect } from "react";

interface StatCardsSectionProps {
  statsDrawerOpen: boolean;
  setStatsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatCardsSection = ({
  statsDrawerOpen,
  setStatsDrawerOpen,
}: StatCardsSectionProps) => {
  // Get current filter values (only academic year and requirement schedule for stats)
  const { filters } = useSubmissionsFilters();
  const { updateFilters } = useDashboardStatsFilters();
  const { stats, error } = useDashboardStats();

  // Sync dashboard stats filters with submission filters (only academicYear and requirementScheduleId)
  useEffect(() => {
    updateFilters(filters.academicYear, filters.requirementScheduleId);
  }, [filters.academicYear, filters.requirementScheduleId, updateFilters]);

  const totalTimingSubmissions =
    stats.on_time_submissions + stats.late_submissions + stats.overdue_count;

  return (
    <>
      {/* Compact summary chip */}
      <div className="flex items-center gap-3">
        <Drawer open={statsDrawerOpen} onOpenChange={setStatsDrawerOpen}>
          <DrawerContent className="min-h-[80vh] px-4 pb-6">
            <DrawerDescription className="sr-only">
              View detailed submission statistics and insights.
            </DrawerDescription>
            <DrawerHeader className="pb-2">
              <DrawerTitle className="text-lg font-semibold">
                Submission overview
              </DrawerTitle>
            </DrawerHeader>

            <ScrollArea className="">
              <div className="w-full max-w-screen lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-h-[60vh]">
                {error && (
                  <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    Error loading stats: {error}
                  </div>
                )}

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-2">
                  {/* Required Submissions */}
                  <StatCard
                    title="Required Submissions"
                    mainValue={stats.total_submissions_required}
                    icon={Users}
                    breakdowns={[
                      {
                        label: "Submitted",
                        value: stats.submitted_count,
                        percentage:
                          (stats.submitted_count /
                            stats.total_submissions_required) *
                          100,
                      },
                      {
                        label: "Not Submitted",
                        value: stats.not_submitted_count,
                        percentage:
                          (stats.not_submitted_count /
                            stats.total_submissions_required) *
                          100,
                      },
                    ]}
                    colorPalette={STAT_CARD_COLOR_PALETTES.submissions}
                  />

                  {/* Submission Status */}
                  <StatCard
                    title="Submission Status"
                    mainValue={stats.submitted_count}
                    icon={FileCheck}
                    breakdowns={[
                      {
                        label: "Approved",
                        value: stats.approved_count,
                        percentage:
                          stats.submitted_count > 0
                            ? (stats.approved_count / stats.submitted_count) *
                              100
                            : 0,
                      },
                      {
                        label: "Pending",
                        value: stats.pending_count,
                        percentage:
                          stats.submitted_count > 0
                            ? (stats.pending_count / stats.submitted_count) *
                              100
                            : 0,
                      },
                      {
                        label: "Rejected",
                        value: stats.rejected_count,
                        percentage:
                          stats.submitted_count > 0
                            ? (stats.rejected_count / stats.submitted_count) *
                              100
                            : 0,
                      },
                      {
                        label: "Manual Review",
                        value: stats.manual_review_count,
                        percentage:
                          stats.submitted_count > 0
                            ? (stats.manual_review_count /
                                stats.submitted_count) *
                              100
                            : 0,
                      },
                    ]}
                    colorPalette={STAT_CARD_COLOR_PALETTES.status}
                  />

                  {/* Verification Method */}
                  <StatCard
                    title="Verification Method"
                    mainValue={stats.approved_count}
                    icon={CheckCircle}
                    breakdowns={[
                      {
                        label: "Manual",
                        value: stats.manual_verification_count,
                        percentage:
                          stats.approved_count > 0
                            ? (stats.manual_verification_count /
                                stats.approved_count) *
                              100
                            : 0,
                      },
                      {
                        label: "Agent",
                        value: stats.agent_verification_count,
                        percentage:
                          stats.approved_count > 0
                            ? (stats.agent_verification_count /
                                stats.approved_count) *
                              100
                            : 0,
                      },
                    ]}
                    colorPalette={STAT_CARD_COLOR_PALETTES.verification}
                  />

                  {/* Timing */}
                  <StatCard
                    title="Submission Timing"
                    mainValue={totalTimingSubmissions}
                    icon={Clock}
                    breakdowns={[
                      {
                        label: "On Time",
                        value: stats.on_time_submissions,
                        percentage:
                          totalTimingSubmissions > 0
                            ? (stats.on_time_submissions /
                                totalTimingSubmissions) *
                              100
                            : 0,
                      },
                      {
                        label: "Late",
                        value: stats.late_submissions,
                        percentage:
                          totalTimingSubmissions > 0
                            ? (stats.late_submissions /
                                totalTimingSubmissions) *
                              100
                            : 0,
                      },
                      {
                        label: "Overdue",
                        value: stats.overdue_count,
                        percentage:
                          totalTimingSubmissions > 0
                            ? (stats.overdue_count / totalTimingSubmissions) *
                              100
                            : 0,
                      },
                    ]}
                    colorPalette={STAT_CARD_COLOR_PALETTES.timing}
                  />
                </div>
              </div>
            </ScrollArea>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3"
              >
                Close
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default StatCardsSection;
