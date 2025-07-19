import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Certificate } from "@/mock/certificates.mock";
import { formatDate, getInitials } from "@/utils/staff/central-dashboard.utils";
import {
  Award,
  CalendarDays,
  Clock,
  Edit,
  FileText,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import VerificationTemplateMD from "./verification-template-md";

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <Card
      key={certificate.id}
      className="group bg-white/90 border border-blue-100 outline-none shadow-none transition-all duration-300 overflow-hidden hover:bg-gradient-to-r hover:from-slate-50 hover:via-blue-50 hover:to-slate-100"
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-blue-500 to-blue-600">
              <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                {getInitials(certificate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {certificate.name}
              </CardTitle>
              <Badge
                variant="outline"
                className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {certificate.code}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start">
            <Badge
              variant={certificate.has_expiration ? "secondary" : "default"}
              className={`${
                certificate.has_expiration
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
              } border-0 text-xs sm:text-sm px-2 sm:px-3 py-1`}
            >
              {certificate.has_expiration ? (
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              ) : (
                <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              )}
              {certificate.has_expiration ? "Expires" : "Permanent"}
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
          {certificate.description}
        </p>

        <VerificationTemplateMD template={certificate.verification_template} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-teal-100 rounded-lg">
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500">
                Certificate ID
              </p>
              <p className="font-medium text-slate-900 text-xs">
                {certificate.id.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500">Requirements</p>
              <p className="font-medium text-slate-900 text-sm">
                {certificate.program_requirements_count}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500">Submissions</p>
              <p className="font-medium text-slate-900 text-sm">
                {certificate.certificate_submissions_count.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600/70" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-500">Type</p>
              <p className="font-medium text-slate-900 text-xs">
                {certificate.has_expiration ? "Renewable" : "Lifetime"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 pt-3 border-t border-blue-100 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Created:</span>
            <span className="text-slate-700 font-medium">
              {formatDate(certificate.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Updated:</span>
            <span className="text-slate-700 font-medium">
              {formatDate(certificate.updated_at)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
