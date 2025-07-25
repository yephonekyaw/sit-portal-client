import type {
  ProgramRequirementSchedule,
  CertificateSubmission,
} from "@/types/student/submission.types";

// Mock Program Requirement Schedules for a specific student
export const studentSchedules: ProgramRequirementSchedule[] = [
  {
    id: "schedule-1",
    program_requirement_id: "req-1",
    academic_year_id: "year-2024",
    submission_deadline: "2025-12-31T23:59:59Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    program_requirement: {
      id: "req-1",
      program_id: "prog-cs",
      cert_type_id: "cert-dlc",
      name: "Digital Literacy Certificate",
      target_year: 4,
      deadline_month: 12,
      deadline_day: 31,
      is_mandatory: true,
      special_instruction:
        "This certificate must be obtained from Microsoft or Google certified training providers. Please ensure the certificate shows completion date and your full name as registered in the university system.",
      is_active: true,
      recurrence_type: "ANNUAL",
      last_recurred_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      program: {
        id: "prog-cs",
        program_code: "CS",
        program_name: "Computer Science",
        description: "Bachelor of Science in Computer Science",
        duration_years: 4,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
      certificate_type: {
        id: "cert-dlc",
        code: "DLC",
        name: "Digital Literacy Certificate",
        description:
          "Certificate demonstrating proficiency in digital tools and technologies including Microsoft Office Suite, Google Workspace, and basic programming concepts.",
        verification_template: "Verify digital literacy skills and knowledge",
        has_expiration: false,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
    },
    academic_year: {
      id: "year-2024",
      year_code: "2024",
      start_date: "2024-01-01T00:00:00Z",
      end_date: "2024-12-31T23:59:59Z",
      is_current: true,
      created_at: "2023-12-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "schedule-2",
    program_requirement_id: "req-2",
    academic_year_id: "year-2024",
    submission_deadline: "2025-11-30T23:59:59Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    program_requirement: {
      id: "req-2",
      program_id: "prog-cs",
      cert_type_id: "cert-pcc",
      name: "Professional Communication Certificate",
      target_year: 3,
      deadline_month: 11,
      deadline_day: 30,
      is_mandatory: false,
      special_instruction: undefined,
      is_active: true,
      recurrence_type: "ANNUAL",
      last_recurred_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      program: {
        id: "prog-cs",
        program_code: "CS",
        program_name: "Computer Science",
        description: "Bachelor of Science in Computer Science",
        duration_years: 4,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
      certificate_type: {
        id: "cert-pcc",
        code: "PCC",
        name: "Professional Communication Certificate",
        description:
          "Certificate in professional communication skills including presentation, writing, and interpersonal communication in workplace settings.",
        verification_template: "Verify professional communication competency",
        has_expiration: true,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
    },
    academic_year: {
      id: "year-2024",
      year_code: "2024",
      start_date: "2024-01-01T00:00:00Z",
      end_date: "2024-12-31T23:59:59Z",
      is_current: true,
      created_at: "2023-12-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "schedule-3",
    program_requirement_id: "req-3",
    academic_year_id: "year-2024",
    submission_deadline: "2025-12-15T23:59:59Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    program_requirement: {
      id: "req-3",
      program_id: "prog-cs",
      cert_type_id: "cert-iic",
      name: "Industry Internship Certificate",
      target_year: 4,
      deadline_month: 1,
      deadline_day: 15,
      is_mandatory: true,
      special_instruction:
        "Must complete minimum 3 months internship at a recognized technology company. Certificate should include company details, internship duration, and supervisor signature.",
      is_active: true,
      recurrence_type: "ONCE",
      last_recurred_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      program: {
        id: "prog-cs",
        program_code: "CS",
        program_name: "Computer Science",
        description: "Bachelor of Science in Computer Science",
        duration_years: 4,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
      certificate_type: {
        id: "cert-iic",
        code: "IIC",
        name: "Industry Internship Certificate",
        description:
          "Certificate of completion for industry internship program demonstrating practical work experience in technology sector.",
        verification_template: "Verify internship completion and duration",
        has_expiration: false,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
    },
    academic_year: {
      id: "year-2024",
      year_code: "2024",
      start_date: "2024-01-01T00:00:00Z",
      end_date: "2024-12-31T23:59:59Z",
      is_current: true,
      created_at: "2023-12-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "schedule-4",
    program_requirement_id: "req-4",
    academic_year_id: "year-2024",
    submission_deadline: "2025-10-31T23:59:59Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    program_requirement: {
      id: "req-4",
      program_id: "prog-cs",
      cert_type_id: "cert-ethics",
      name: "Professional Ethics Certificate",
      target_year: 3,
      deadline_month: 10,
      deadline_day: 31,
      is_mandatory: true,
      special_instruction:
        "Complete online ethics course from recognized institution such as CITI Program or similar accredited provider.",
      is_active: true,
      recurrence_type: "ANNUAL",
      last_recurred_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      program: {
        id: "prog-cs",
        program_code: "CS",
        program_name: "Computer Science",
        description: "Bachelor of Science in Computer Science",
        duration_years: 4,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
      certificate_type: {
        id: "cert-ethics",
        code: "ETHICS",
        name: "Professional Ethics Certificate",
        description:
          "Certificate demonstrating understanding of professional ethics in technology and computing fields.",
        verification_template: "Verify ethics training completion",
        has_expiration: true,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
    },
    academic_year: {
      id: "year-2024",
      year_code: "2024",
      start_date: "2024-01-01T00:00:00Z",
      end_date: "2024-12-31T23:59:59Z",
      is_current: true,
      created_at: "2023-12-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "schedule-5",
    program_requirement_id: "req-5",
    academic_year_id: "year-2024",
    submission_deadline: "2025-09-15T23:59:59Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    program_requirement: {
      id: "req-5",
      program_id: "prog-cs",
      cert_type_id: "cert-safety",
      name: "Workplace Safety Certificate",
      target_year: 2,
      deadline_month: 9,
      deadline_day: 15,
      is_mandatory: false,
      special_instruction: undefined,
      is_active: true,
      recurrence_type: "ANNUAL",
      last_recurred_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      program: {
        id: "prog-cs",
        program_code: "CS",
        program_name: "Computer Science",
        description: "Bachelor of Science in Computer Science",
        duration_years: 4,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
      certificate_type: {
        id: "cert-safety",
        code: "SAFETY",
        name: "Workplace Safety Certificate",
        description:
          "Certificate in workplace safety practices and emergency procedures for office and laboratory environments.",
        verification_template: "Verify safety training completion",
        has_expiration: true,
        is_active: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-06-01T00:00:00Z",
      },
    },
    academic_year: {
      id: "year-2024",
      year_code: "2024",
      start_date: "2024-01-01T00:00:00Z",
      end_date: "2024-12-31T23:59:59Z",
      is_current: true,
      created_at: "2023-12-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

// Mock Certificate Submissions for the student
export const studentSubmissions: CertificateSubmission[] = [
  {
    id: "sub-1",
    student_id: "student-123",
    cert_type_id: "cert-dlc",
    requirement_schedule_id: "schedule-1",
    file_name: "digital_literacy_certificate.pdf",
    file_key: "uploads/student-123/digital_literacy_certificate.pdf",
    file_size: 2048000, // 2MB
    mime_type: "application/pdf",
    status: "APPROVED",
    agent_confidence_score: 0.95,
    submitted_at: "2024-10-15T10:30:00Z",
    updated_at: "2024-10-15T14:45:00Z",
    expired_at: undefined,
    verification_history: [
      {
        id: "hist-1",
        submission_id: "sub-1",
        verifier_id: undefined,
        verification_type: "AGENT",
        old_status: "PENDING",
        new_status: "APPROVED",
        comments:
          "Certificate verified successfully by AI system. All required information is present and valid.",
        reasons: undefined,
        agent_analysis_result: {
          confidence: 0.95,
          verified_elements: [
            "certificate_name",
            "issue_date",
            "student_name",
            "institution",
          ],
          analysis_notes:
            "High confidence verification - all elements match requirements",
        },
        created_at: "2024-10-15T11:00:00Z",
        updated_at: "2024-10-15T11:00:00Z",
      },
    ],
  },
  {
    id: "sub-2",
    student_id: "student-123",
    cert_type_id: "cert-ethics",
    requirement_schedule_id: "schedule-4",
    file_name: "ethics_certificate_citi.pdf",
    file_key: "uploads/student-123/ethics_certificate_citi.pdf",
    file_size: 1536000, // 1.5MB
    mime_type: "application/pdf",
    status: "REJECTED",
    agent_confidence_score: 0.32,
    submitted_at: "2024-09-20T08:15:00Z",
    updated_at: "2024-09-21T09:30:00Z",
    expired_at: undefined,
    verification_history: [
      {
        id: "hist-2",
        submission_id: "sub-2",
        verifier_id: "staff-456",
        verification_type: "MANUAL",
        old_status: "MANUAL_REVIEW",
        new_status: "REJECTED",
        comments:
          "Certificate does not meet the required standards. Please resubmit with a certificate from an accredited institution.",
        reasons:
          "Certificate appears to be from an unrecognized provider. The completion date is also outside the acceptable time frame for this academic year.",
        agent_analysis_result: undefined,
        created_at: "2024-09-21T09:30:00Z",
        updated_at: "2024-09-21T09:30:00Z",
      },
      {
        id: "hist-3",
        submission_id: "sub-2",
        verifier_id: undefined,
        verification_type: "AGENT",
        old_status: "PENDING",
        new_status: "MANUAL_REVIEW",
        comments: "Low confidence score detected. Escalating to manual review.",
        reasons:
          "Unable to verify certificate authenticity with high confidence",
        agent_analysis_result: {
          confidence: 0.32,
          verified_elements: ["student_name"],
          missing_elements: ["valid_institution", "proper_formatting"],
          analysis_notes: "Low confidence due to unclear certificate source",
        },
        created_at: "2024-09-20T08:30:00Z",
        updated_at: "2024-09-20T08:30:00Z",
      },
    ],
  },
  {
    id: "sub-3",
    student_id: "student-123",
    cert_type_id: "cert-safety",
    requirement_schedule_id: "schedule-5",
    file_name: "workplace_safety_cert.jpg",
    file_key: "uploads/student-123/workplace_safety_cert.jpg",
    file_size: 3145728, // 3MB
    mime_type: "image/jpeg",
    status: "PENDING",
    agent_confidence_score: 0.78,
    submitted_at: "2024-08-28T16:45:00Z",
    updated_at: "2024-08-28T16:45:00Z",
    expired_at: undefined,
    verification_history: [
      {
        id: "hist-4",
        submission_id: "sub-3",
        verifier_id: undefined,
        verification_type: "AGENT",
        old_status: "PENDING",
        new_status: "PENDING",
        comments:
          "Certificate submitted and under initial review. Processing may take 2-3 business days.",
        reasons: undefined,
        agent_analysis_result: {
          confidence: 0.78,
          verified_elements: [
            "certificate_name",
            "student_name",
            "completion_date",
          ],
          analysis_notes:
            "Medium confidence - image quality affects some text recognition",
        },
        created_at: "2024-08-28T17:00:00Z",
        updated_at: "2024-08-28T17:00:00Z",
      },
    ],
  },
];

// Helper function to get submission by schedule ID
export const getSubmissionByScheduleId = (
  scheduleId: string
): CertificateSubmission | undefined => {
  return studentSubmissions.find(
    (submission) => submission.requirement_schedule_id === scheduleId
  );
};

// Helper function to get schedule by ID
export const getScheduleById = (
  scheduleId: string
): ProgramRequirementSchedule | undefined => {
  return studentSchedules.find((schedule) => schedule.id === scheduleId);
};

// Export types for TypeScript
export type StudentSchedule = (typeof studentSchedules)[number];
export type StudentSubmission = (typeof studentSubmissions)[number];
