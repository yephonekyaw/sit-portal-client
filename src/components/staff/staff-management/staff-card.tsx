import { CardContent } from "@/components/ui/card";
import { Mail, Building2, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StaffCardProps } from "@/types/staff/staff.types";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { formatDate } from "@/utils/common.utils";

export default function StaffCard({ staff, onEdit }: StaffCardProps) {
  const handleEdit = () => {
    onEdit?.(staff);
  };

  const activePermissions = staff.permissions.filter((p) => p.is_active);
  const displayName = `${staff.user.first_name} ${staff.user.last_name}`;

  return (
    <CardBase>
      <CardHeaderSection
        title={displayName}
        codes={[staff.employee_id]}
        isActive={staff.user.is_active}
        onEdit={handleEdit}
      />

      <CardContent className="pt-0 space-y-6">
        <CardInfoSection>
          <CardInfoItem icon={Mail} label="Email" value={staff.user.email} />
          <CardInfoItem
            icon={Building2}
            label="Department"
            value={staff.department}
          />
          <CardInfoItem
            icon={Shield}
            label="Active Permissions"
            value={activePermissions.length}
          />
          <CardInfoItem
            icon={Calendar}
            label="Last Login"
            value={
              staff.user.last_login
                ? formatDate(staff.user.last_login, {})
                : "Never"
            }
          />
        </CardInfoSection>

        {/* Permissions badges */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Program Access</h4>
          <div className="flex flex-wrap gap-2">
            {activePermissions.length > 0 ? (
              activePermissions.map((permission, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {permission.program.program_code} • {permission.role.name}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs text-slate-500">
                No active permissions
              </Badge>
            )}
          </div>
        </div>

        <CardFooter createdAt={staff.created_at} updatedAt={staff.updated_at} />
      </CardContent>
    </CardBase>
  );
}
