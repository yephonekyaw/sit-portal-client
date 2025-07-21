import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { CardHeaderSectionProps } from "@/types/staff/dashboard.types";
import { getInitialsOneInput } from "@/utils/shared.utils";
import { CheckCircle, XCircle, Edit, Trash2, TicketCheck } from "lucide-react";

const CardHeaderSection = ({
  title,
  codes,
  isActive,
  onEdit,
  onDelete,
  onClickVerify,
}: CardHeaderSectionProps) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-500 to-blue-600">
            <AvatarFallback className="bg-transparent text-white font-bold text-sm">
              {getInitialsOneInput(title)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 leading-tight">
              {title}
            </CardTitle>
            <div className="flex flex-wrap gap-1.5">
              {codes.map((code, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
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
            } border-0 text-xs sm:text-sm px-2 sm:px-3 py-1`}
          >
            {isActive ? (
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            ) : (
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            )}
            {isActive ? "Active" : "Inactive"}
          </Badge>
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-blue-600"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-rose-600"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
          {onClickVerify && (
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-100 outline-none shadow-none border-none text-blue-600 hover:bg-blue-200 hover:text-blue-700 cursor-pointer transition-all duration-200 rounded-lg px-3 py-2 font-medium"
              onClick={onClickVerify}
            >
              <TicketCheck className="h-4 w-4 mr-2" />
              Verify
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderSection;
