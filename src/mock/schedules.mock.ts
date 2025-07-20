export const schedules = [
  {
    id: "3d2fc3e5-6f74-47e1-9632-fc720d4e4f5c",
    program: {
      program_code: "CS-BSc",
      program_name: "Computer Science",
    },
    certificate_type: {
      code: "CITI_RCR_CERT",
      name: "Responsible Conduct of Research (RCR) Certificate",
    },
    academic_year: {
      year_code: "2023",
    },
    program_requirement: {
      name: "CITI RCR Certificate for CS-BSc",
      is_mandatory: true,
    },
    submission_deadline: "2026-08-15T23:59:59",
    created_at: "2024-01-15T10:00:00",
    updated_at: "2024-03-20T10:00:00",
  },
];

export type Schedule = (typeof schedules)[number];
