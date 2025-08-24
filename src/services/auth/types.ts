export type UserType = "student" | "staff";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  isActive: boolean;
}
