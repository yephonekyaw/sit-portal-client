import type {
  StaffMemberDetails,
  Program,
  Role,
  User,
  Staff,
  StaffPermissionWithDetails,
  AddStaffFormData,
} from "@/types/staff/staff.types";

// Mock Users
const mockUsers: User[] = [
  {
    id: "user-1",
    email: "john.doe@sit.edu.sg",
    first_name: "John",
    last_name: "Doe",
    user_type: "staff",
    is_active: true,
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-01-15T08:00:00Z",
    last_login: "2024-07-22T14:30:00Z",
  },
  {
    id: "user-2",
    email: "jane.smith@sit.edu.sg",
    first_name: "Jane",
    last_name: "Smith",
    user_type: "staff",
    is_active: true,
    created_at: "2024-02-01T09:00:00Z",
    updated_at: "2024-02-01T09:00:00Z",
    last_login: "2024-07-23T10:15:00Z",
  },
  {
    id: "user-3",
    email: "mike.wilson@sit.edu.sg",
    first_name: "Mike",
    last_name: "Wilson",
    user_type: "staff",
    is_active: true,
    created_at: "2024-03-10T11:00:00Z",
    updated_at: "2024-03-10T11:00:00Z",
    last_login: "2024-07-23T16:45:00Z",
  },
  {
    id: "user-4",
    email: "sarah.johnson@sit.edu.sg",
    first_name: "Sarah",
    last_name: "Johnson",
    user_type: "staff",
    is_active: false,
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-06-15T14:00:00Z",
  },
];

// Mock Programs
export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    program_code: "CS",
    program_name: "Computer Science",
    description: "Bachelor of Science in Computer Science",
    duration_years: 4,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "prog-2",
    program_code: "DSI",
    program_name: "Data Science and Intelligence",
    description: "Bachelor of Science in Data Science and Intelligence",
    duration_years: 4,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "prog-3",
    program_code: "IT",
    program_name: "Information Technology",
    description: "Bachelor of Science in Information Technology",
    duration_years: 4,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

// Mock Roles
export const mockRoles: Role[] = [
  {
    id: "role-1",
    name: "admin",
    description: "Administrator with full access to program management",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

// Mock Staff Members
const mockStaff: Staff[] = [
  {
    id: "staff-1",
    user_id: "user-1",
    employee_id: "EMP001",
    department: "Computer Science",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-01-15T08:00:00Z",
  },
  {
    id: "staff-2",
    user_id: "user-2",
    employee_id: "EMP002",
    department: "Data Science",
    created_at: "2024-02-01T09:00:00Z",
    updated_at: "2024-02-01T09:00:00Z",
  },
  {
    id: "staff-3",
    user_id: "user-3",
    employee_id: "EMP003",
    department: "Information Technology",
    created_at: "2024-03-10T11:00:00Z",
    updated_at: "2024-03-10T11:00:00Z",
  },
  {
    id: "staff-4",
    user_id: "user-4",
    employee_id: "EMP004",
    department: "Academic Affairs",
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-06-15T14:00:00Z",
  },
];

// Mock Staff Permissions with Details
const mockStaffPermissions: StaffPermissionWithDetails[][] = [
  // Staff 1 permissions - CS and DSI admin
  [
    {
      id: "perm-1",
      is_active: true,
      assigned_at: "2024-01-15T08:00:00Z",
      program: mockPrograms[0], // CS
      role: mockRoles[0], // admin
    },
    {
      id: "perm-2",
      is_active: true,
      assigned_at: "2024-01-15T08:00:00Z",
      program: mockPrograms[1], // DSI
      role: mockRoles[0], // admin
    },
  ],
  // Staff 2 permissions - DSI admin only
  [
    {
      id: "perm-3",
      is_active: true,
      assigned_at: "2024-02-01T09:00:00Z",
      program: mockPrograms[1], // DSI
      role: mockRoles[0], // admin
    },
  ],
  // Staff 3 permissions - IT admin only
  [
    {
      id: "perm-4",
      is_active: true,
      assigned_at: "2024-03-10T11:00:00Z",
      program: mockPrograms[2], // IT
      role: mockRoles[0], // admin
    },
  ],
  // Staff 4 permissions - CS admin (but user is inactive)
  [
    {
      id: "perm-5",
      is_active: false,
      assigned_at: "2024-01-20T10:00:00Z",
      program: mockPrograms[0], // CS
      role: mockRoles[0], // admin
    },
  ],
];

// Combine all data into StaffMemberDetails
export const mockStaffMembers: StaffMemberDetails[] = mockStaff.map(
  (staff, index) => ({
    ...staff,
    user: mockUsers.find((user) => user.id === staff.user_id)!,
    permissions: mockStaffPermissions[index] || [],
  })
);

// Helper function to get active staff members only
export const getActiveStaffMembers = (): StaffMemberDetails[] => {
  return mockStaffMembers.filter((staff) => staff.user.is_active);
};

// Helper function to simulate adding a new staff member
export const addMockStaffMember = (
  staffData: AddStaffFormData
): StaffMemberDetails => {
  const newId = `staff-${Date.now()}`;
  const userId = `user-${Date.now()}`;

  const newUser: User = {
    id: userId,
    email: staffData.email,
    first_name: staffData.first_name,
    last_name: staffData.last_name,
    user_type: "staff",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const newStaff: Staff = {
    id: newId,
    user_id: userId,
    employee_id: staffData.employee_id,
    department: staffData.department,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const permissions: StaffPermissionWithDetails[] =
    staffData.program_permissions.map((pp, index: number) => ({
      id: `perm-${Date.now()}-${index}`,
      is_active: true,
      assigned_at: new Date().toISOString(),
      program: mockPrograms.find((p) => p.id === pp.program_id)!,
      role: mockRoles.find((r) => r.id === pp.role_id)!,
    }));

  return {
    ...newStaff,
    user: newUser,
    permissions,
  };
};
