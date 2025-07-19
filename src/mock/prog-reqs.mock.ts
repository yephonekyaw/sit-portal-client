export const programRequirements = [
  {
    id: "24d41114-de56-468e-a967-5b79846a6661",
    program: { code: "CS-BSc", name: "Computer Science" },
    certificate_type: {
      code: "CITI_RCR_CERT",
      name: "Responsible Conduct of Research (RCR) Certificate",
    },
    target_year: 3,
    deadline_month: 6,
    deadline_day: 15,
    is_mandatory: true,
    special_instruction:
      "Must complete minimum 3 months internship in a recognized IT company. Submit internship completion certificate along with supervisor evaluation report.",
    is_active: true,
    recurrence_type: "annual",
    last_recurred_at: "2024-01-15T00:00:00Z",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
  },
];

export type ProgramRequirement = (typeof programRequirements)[number];
