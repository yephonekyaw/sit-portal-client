// Base interfaces matching database schema
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "student" | "staff";
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}

export interface Staff {
  id: string;
  user_id: string;
  employee_id: string;
  department: string;
  created_at: string;
  updated_at?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at?: string;
}

export interface Program {
  id: string;
  program_code: string;
  program_name: string;
  description: string;
  duration_years: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Permission {
  id: string;
  program_id: string;
  role_id: string;
  created_at: string;
  updated_at?: string;
}

export interface StaffPermission {
  id: string;
  staff_id: string;
  permission_id: string;
  is_active: boolean;
  assigned_by?: string;
  assigned_at: string;
  expires_at?: string;
  created_at: string;
  updated_at?: string;
}

// Combined interfaces for display purposes
export interface StaffWithUser {
  id: string;
  employee_id: string;
  department: string;
  created_at: string;
  updated_at?: string;
  user: User;
}

export interface StaffPermissionWithDetails {
  id: string;
  is_active: boolean;
  assigned_at: string;
  expires_at?: string;
  program: Program;
  role: Role;
  assigned_by_staff?: StaffWithUser;
}

export interface StaffMemberDetails {
  id: string;
  employee_id: string;
  department: string;
  created_at: string;
  updated_at: string;
  user: User;
  permissions: StaffPermissionWithDetails[];
}

// Form types
export interface AddStaffFormData {
  email: string;
  first_name: string;
  last_name: string;
  employee_id: string;
  department: string;
  program_permissions: {
    program_id: string;
    role_id: string;
  }[];
}

// Component props
export interface StaffListProps {
  staff: StaffMemberDetails[];
  onEdit?: (staff: StaffMemberDetails) => void;
}

export interface StaffCardProps {
  staff: StaffMemberDetails;
  onEdit?: (staff: StaffMemberDetails) => void;
}

export interface AddStaffFormProps {
  onSubmit: (data: AddStaffFormData) => void;
  onCancel: () => void;
  programs: Program[];
  roles: Role[];
  isLoading?: boolean;
}

export interface StaffPermissionBadgeProps {
  permission: StaffPermissionWithDetails;
  variant?: "default" | "secondary" | "outline";
}

// Store/State types
export interface StaffManagementState {
  // Data
  staffMembers: StaffMemberDetails[];
  programs: Program[];
  roles: Role[];

  // UI State
  isLoading: boolean;
  isAddFormOpen: boolean;
  selectedStaff: StaffMemberDetails | null;

  // Actions
  loadStaffMembers: () => Promise<void>;
  loadPrograms: () => Promise<void>;
  loadRoles: () => Promise<void>;
  addStaffMember: (data: AddStaffFormData) => Promise<void>;
  updateStaffMember: (
    id: string,
    data: Partial<AddStaffFormData>
  ) => Promise<void>;
  setAddFormOpen: (open: boolean) => void;
  setSelectedStaff: (staff: StaffMemberDetails | null) => void;
}
