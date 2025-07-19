import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";
import { getInitials } from "@/utils/staff/central-dashboard.utils";

interface CardHeaderSectionProps {
  title: string;
  code: string;
  isActive: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CardHeaderSection = ({
  title,
  code,
  isActive,
  onEdit,
  onDelete,
}: CardHeaderSectionProps) => {
  return (
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-500 to-blue-600">
            <AvatarFallback className="bg-transparent text-white font-bold text-sm">
              {getInitials(title)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 leading-tight">
              {title}
            </CardTitle>
            <Badge
              variant="outline"
              className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {code}
            </Badge>
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
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderSection;
