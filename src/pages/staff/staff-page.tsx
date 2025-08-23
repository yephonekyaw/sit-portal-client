import { useState } from "react";
import { UserLock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StaffList from "@/components/staff/staff-management/staff-list";
import { mockStaffMembers } from "@/mock/staff.mock";
import type { StaffMemberDetails } from "@/types/staff/staff.types";

const StaffPage = () => {
  const navigate = useNavigate();
  const [staffMembers] = useState<StaffMemberDetails[]>(mockStaffMembers);

  const handleEdit = (staff: StaffMemberDetails) => {
    console.log("Edit staff:", staff);
    // TODO: Implement staff edit functionality
    // navigate(`/staff/staff-management/edit/${staff.id}`);
  };

  const handleAddStaff = () => {
    navigate("/staff/staff-management/new");
  };

  const activeStaffCount = staffMembers.filter((s) => s.user.is_active).length;

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <UserLock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">
                Staff Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage staff members and their program access permissions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                {activeStaffCount}
              </div>
              <div className="text-xs text-gray-600">Active Staff</div>
            </div>
            <Button
              onClick={handleAddStaff}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>
        </div>
      </header>

      {/* Staff List */}
      <StaffList staff={staffMembers} onEdit={handleEdit} />
    </div>
  );
};

export default StaffPage;
