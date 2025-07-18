import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { programs } from "@/mock/programs.mock";
import { Button } from "@/components/ui/button";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProgramCards() {
  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <Card
          key={program.id}
          className="group bg-white/90 border border-blue-100 outline-none shadow-none transition-all duration-300 overflow-hidden hover:bg-gradient-to-r hover:from-slate-50 hover:via-blue-50 hover:to-slate-100"
        >
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-500 to-blue-600">
                  <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                    {getInitials(program.program_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {program.program_name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {program.program_code}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start">
                <Badge
                  variant={program.is_active ? "default" : "secondary"}
                  className={`${
                    program.is_active
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                  } border-0 text-xs sm:text-sm px-2 sm:px-3 py-1`}
                >
                  {program.is_active ? (
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  ) : (
                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  )}
                  {program.is_active ? "Active" : "Inactive"}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-6">
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {program.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500">Duration</p>
                  <p className="font-medium text-slate-900 text-sm">
                    {program.duration_years} years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500">Students</p>
                  <p className="font-medium text-slate-900 text-sm">
                    {program.student_count}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-teal-100 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Requirements
                  </p>
                  <p className="font-medium text-slate-900 text-sm">
                    {program.requirement_count}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg">
                  <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600/70" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Program ID
                  </p>
                  <p className="font-medium text-slate-900 text-xs">
                    {program.id.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-blue-100 text-xs sm:text-sm">
              <div className="flex items-center gap-4">
                <span className="text-slate-500">Created:</span>
                <span className="text-slate-700 font-medium">
                  {formatDate(program.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-500">Updated:</span>
                <span className="text-slate-700 font-medium">
                  {formatDate(program.updated_at)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
