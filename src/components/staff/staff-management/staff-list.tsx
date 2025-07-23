import type { StaffListProps } from "@/types/staff/staff.types";
import StaffCard from "./staff-card";

export default function StaffList({ staff, onEdit }: StaffListProps) {
  if (staff.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-500 mb-2">No staff members found</div>
        <div className="text-sm text-slate-400">
          Add staff members to get started
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {staff.map((staffMember) => (
        <StaffCard key={staffMember.id} staff={staffMember} onEdit={onEdit} />
      ))}
    </div>
  );
}
