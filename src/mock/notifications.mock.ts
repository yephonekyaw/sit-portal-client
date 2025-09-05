import type { Notification } from "@/types/notification.types";
import { v4 as uuidv4 } from "uuid";

// Mock current user IDs for different roles
export const MOCK_USER_IDS = {
  student: "student-user-001",
  staff: "staff-user-001",
};

const generateTimestamp = (
  daysAgo: number = 0,
  hoursAgo: number = 0,
  minutesAgo: number = 0
) => {
  const now = new Date();
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  return now.toISOString();
};

// Mock notifications using database-aligned structure
export const mockNotificationsByUser: Record<string, Notification[]> = {
  [MOCK_USER_IDS.student]: [
    {
      id: uuidv4(),
      notification_type_id: "cert-submission-approved",
      entity_id: "cert-001",
      actor_type: "user",
      actor_id: "staff-001",
      subject: "Certificate Approved: AWS Cloud Practitioner",
      body: "`AWS Cloud Practitioner` certificate has been **approved** by Dr. Smith.",
      priority: "medium",
      notification_metadata: {
        certificate_name: "AWS Cloud Practitioner",
        student_name: "John Doe",
        student_roll_number: "CS2023001",
        program_name: "Computer Science",
        verifier_name: "Dr. Smith",
      },
      created_at: generateTimestamp(0, 1, 0),
      updated_at: generateTimestamp(0, 1, 0),

      // Recipient data for this user
      recipient_id: MOCK_USER_IDS.student,
      recipient_status: "pending",
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "cert-submission-rejected",
      entity_id: "cert-002",
      actor_type: "user",
      actor_id: "staff-002",
      subject: "Certificate Rejected: Google Analytics",
      body: "`Google Analytics` certificate was **rejected**. **Reason:** Document quality is poor",
      priority: "high",
      notification_metadata: {
        certificate_name: "Google Analytics",
        student_name: "John Doe",
        student_roll_number: "CS2023001",
        program_name: "Computer Science",
        verifier_name: "Prof. Johnson",
        rejection_reason: "Document quality is poor",
      },
      created_at: generateTimestamp(0, 2, 30),
      updated_at: generateTimestamp(0, 2, 30),

      recipient_id: MOCK_USER_IDS.student,
      recipient_status: "pending",
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "requirement-reminder",
      entity_id: "req-001",
      actor_type: "system",
      subject: "Requirement Reminder: Final Year Project",
      body: "`Final Year Project` deadline is approaching. Due in **5 days** on 2025-07-29.",
      priority: "medium",
      notification_metadata: {
        requirement_name: "Final Year Project",
        program_name: "Computer Science",
        deadline_date: "2025-07-29",
      },
      created_at: generateTimestamp(0, 4, 0),
      updated_at: generateTimestamp(0, 4, 0),

      recipient_id: MOCK_USER_IDS.student,
      recipient_status: "delivered",
      delivered_at: generateTimestamp(0, 3, 45),
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "cert-submission-success",
      entity_id: "cert-003",
      actor_type: "system",
      subject: "Certificate Submitted Successfully",
      body: "Your `Microsoft Azure Fundamentals` certificate has been submitted and is pending review.",
      priority: "low",
      notification_metadata: {
        certificate_name: "Microsoft Azure Fundamentals",
        student_name: "John Doe",
        student_roll_number: "CS2023001",
        program_name: "Computer Science",
      },
      created_at: generateTimestamp(1, 0, 0),
      updated_at: generateTimestamp(1, 0, 0),

      recipient_id: MOCK_USER_IDS.student,
      recipient_status: "read",
      delivered_at: generateTimestamp(0, 23, 45),
      read_at: generateTimestamp(0, 23, 30),
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "requirement-overdue",
      entity_id: "req-002",
      actor_type: "scheduled",
      subject: "Requirement Overdue: Internship Report",
      body: "`Internship Report` is **3 days overdue**. Please submit immediately.",
      priority: "urgent",
      notification_metadata: {
        requirement_name: "Internship Report",
        program_name: "Computer Science",
        deadline_date: "2025-07-21",
      },
      created_at: generateTimestamp(0, 6, 0),
      updated_at: generateTimestamp(0, 6, 0),

      recipient_id: MOCK_USER_IDS.student,
      recipient_status: "pending",
      in_app_enabled: true,
      microsoft_teams_enabled: true,
    },
  ],

  [MOCK_USER_IDS.staff]: [
    {
      id: uuidv4(),
      notification_type_id: "cert-submission-new",
      entity_id: "cert-010",
      actor_type: "user",
      actor_id: "student-010",
      subject: "New Certificate Submission: AWS Cloud Practitioner",
      body: "**Noah Lee** `CS2023012` submitted `AWS Cloud Practitioner` for Computer Science. Status: `PENDING`",
      priority: "high",
      notification_metadata: {
        certificate_name: "AWS Cloud Practitioner",
        student_name: "Noah Lee",
        student_roll_number: "CS2023012",
        program_name: "Computer Science",
      },
      created_at: generateTimestamp(0, 0, 30),
      updated_at: generateTimestamp(0, 0, 30),

      recipient_id: MOCK_USER_IDS.staff,
      recipient_status: "pending",
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "cert-submission-updated",
      entity_id: "cert-011",
      actor_type: "user",
      actor_id: "student-011",
      subject: "Certificate Submission Updated: TOEFL iBT",
      body: "**James Wong** `EN2023011` updated `TOEFL iBT` submission for English Studies. File: TOEFL_James.pdf",
      priority: "medium",
      notification_metadata: {
        certificate_name: "TOEFL iBT",
        student_name: "James Wong",
        student_roll_number: "EN2023011",
        program_name: "English Studies",
      },
      created_at: generateTimestamp(1, 2, 0),
      updated_at: generateTimestamp(1, 2, 0),

      recipient_id: MOCK_USER_IDS.staff,
      recipient_status: "delivered",
      delivered_at: generateTimestamp(1, 1, 45),
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
    {
      id: uuidv4(),
      notification_type_id: "cert-verification-request",
      entity_id: "cert-012",
      actor_type: "system",
      subject: "Manual Verification Required: PMP Certificate",
      body: "`PMP Certificate` for **Nina Rahman** `MBA2023007` requires manual verification.",
      priority: "high",
      notification_metadata: {
        certificate_name: "PMP Certificate",
        student_name: "Nina Rahman",
        student_roll_number: "MBA2023007",
        program_name: "Business Administration",
      },
      created_at: generateTimestamp(0, 3, 0),
      updated_at: generateTimestamp(0, 3, 0),

      recipient_id: MOCK_USER_IDS.staff,
      recipient_status: "read",
      delivered_at: generateTimestamp(0, 2, 45),
      read_at: generateTimestamp(0, 2, 30),
      in_app_enabled: true,
      microsoft_teams_enabled: true,
    },
    {
      id: uuidv4(),
      notification_type_id: "student-query",
      entity_id: "query-001",
      actor_type: "user",
      actor_id: "student-014",
      subject: "Student Query: Certificate Status",
      body: "**Ava Smith** `IT2023007` inquired about `Google IT Support Certificate` status.",
      priority: "medium",
      notification_metadata: {
        student_name: "Ava Smith",
        student_roll_number: "IT2023007",
        program_name: "Information Technology",
        query_type: "Certificate Status",
      },
      created_at: generateTimestamp(0, 5, 0),
      updated_at: generateTimestamp(0, 5, 0),

      recipient_id: MOCK_USER_IDS.staff,
      recipient_status: "pending",
      in_app_enabled: true,
      microsoft_teams_enabled: false,
    },
  ],
};

// Helper function to get current user ID based on role (for development/testing)
export function getCurrentUserId(role: "student" | "staff"): string {
  return MOCK_USER_IDS[role];
}
