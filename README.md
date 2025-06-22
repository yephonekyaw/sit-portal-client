# Application Overview: Student Certificate Verification System

This application is designed to streamline the **certificate submission and verification process** for students and staff. It consists of **two main sections: one for students and one for staff.**

---

## 🎓 Student Section

The student-facing part of the application focuses on providing a smooth and transparent certificate submission process. Key features include:

### 1. Certificate Submission and Status Tracking
- Students can **upload required certificates** based on their enrolled program (currently supported: CS, DSI, IT).
- Students can **track the verification status** of each submitted certificate.
- Students can **re-download previously uploaded certificates** if needed.

### 2. Notification Center
- A **simple, clear, and informative notification center** allows students to:
  - Check the current status of submitted certificates.
  - Receive updates or alerts regarding their submissions.

---

## 🏢 Staff Section

The staff-facing part of the application supports managing eligible student lists and verifying certificate submissions. Key features include:

### 1. Student List Submission
- Staff can **upload a list of eligible students** each academic year.
- The system currently supports **table-style documents** (e.g., Excel files) with required fields such as:
  - Student ID
  - Email
  - Program
  - Additional required information
- The upload process should be **guided with clear instructions**.

### 2. Manual Verification Workspace
- While the application automates most of the verification process, **manual verification is still necessary** in cases such as:
  - Machine learning model errors
  - Submission of unsupported certificates
- Staff must have a **dedicated workspace** to:
  - Access all uploaded certificates
  - Manually review and verify certificates
  - Update verification statuses as needed

### 3. Staff Dashboard
- A **visual dashboard** to track submission progress, including:
  - Number of students who have submitted, passed, or failed verification
  - Filters by program, year, or other relevant criteria
- The dashboard helps staff:
  - Identify students who haven’t submitted certificates
  - Send reminders or follow-up notifications
- Visual elements may include **charts, graphs, and summary statistics** to provide actionable insights.

---

## 📌 Summary

This application aims to:
- Automate and simplify the certificate verification process.
- Maintain transparency and ease of use for students.
- Provide robust tools and oversight capabilities for staff.
