export const dashboardStats = [
  {
    id: "b6da3678-ef3d-461c-bee6-caa05fb149ba",
    total_submissions_required: 150,
    submitted_count: 120,
    approved_count: 85,
    rejected_count: 15,
    pending_count: 20,
    manual_review_count: 8,
    not_submitted_count: 30,
    on_time_submissions: 95,
    late_submissions: 25,
    overdue_count: 30,
    manual_verification_count: 45,
    agent_verification_count: 75,
    last_calculated_at: "2024-01-20T14:30:00",
  },
];

export type DashboardStat = (typeof dashboardStats)[number];
