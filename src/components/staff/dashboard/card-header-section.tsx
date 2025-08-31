import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { CardHeaderSectionProps } from "@/types/staff/dashboard.types";
import {
  CheckCircle,
  XCircle,
  Edit,
  TicketCheck,
  GraduationCap,
  Archive,
} from "lucide-react";
import React from "react";

const CardHeaderSection = ({
  title,
  codes,
  isActive,
  headerIcon,
  onEdit,
  onArchive,
  onClickVerify,
}: CardHeaderSectionProps) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-500 flex-shrink-0">
            <AvatarFallback className="bg-transparent text-white">
              {headerIcon ? (
                React.createElement(headerIcon, {
                  className: "h-5 w-5 sm:h-6 sm:w-6",
                })
              ) : (
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-bold text-black leading-tight mb-1">
              {title}
            </CardTitle>
            <div className="flex flex-wrap gap-1">
              {codes.map((code, index) => (
                <Badge
                  key={index}
                  className="bg-blue-500 text-white border-0 text-xs px-2 py-0.5"
                >
                  {code}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={`${
              isActive
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                : "bg-rose-100 text-rose-700 hover:bg-rose-100"
            } border-0 text-xs sm:text-sm px-2 sm:px-3 py-2 h-8`}
          >
            {isActive ? (
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            ) : (
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            )}
            {isActive ? "Active" : "Inactive"}
          </Badge>

          <div className="flex gap-1">
            {onEdit && (
              <div
                className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors cursor-pointer"
                title="Edit"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4 text-orange-600" />
              </div>
            )}
            {onArchive && (
              <div
                className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
                title="Archive"
                onClick={onArchive}
              >
                <Archive className="h-4 w-4 text-red-600" />
              </div>
            )}
            {onClickVerify && (
              <div
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors cursor-pointer"
                title="Verify"
                onClick={onClickVerify}
              >
                <TicketCheck className="h-4 w-4 text-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderSection;
