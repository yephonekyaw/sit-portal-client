import { CardContent } from "@/components/ui/card";
import type { Certificate } from "@/mock/certificates.mock";
import { Award, CalendarDays, FileText, ShieldCheck } from "lucide-react";
import CardBase from "./card-base";
import CardHeaderSection from "./card-header-section";
import ExpandableCardContent from "./expandable-card-content";
import CardInfoItem from "./card-info-item";
import CardFooter from "./card-footer";
import CardInfoSection from "./card-info-section";

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <CardBase>
      <CardHeaderSection
        title={certificate.name}
        code={certificate.code}
        isActive={certificate.is_active}
        onEdit={() => console.log("Edit certificate")}
        onDelete={() => console.log("Delete certificate")}
      />

      <CardContent className="pt-0 space-y-6">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {certificate.description}
        </p>

        <ExpandableCardContent
          title="Verification Template"
          subtitle="Template used by LLM for verification"
          content={certificate.verification_template}
          value="verification-template"
          borderColor="border-blue-300"
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />

        <CardInfoSection>
          <CardInfoItem
            icon={
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
            }
            iconBgColor="bg-teal-100"
            label="Certificate ID"
            value={`${certificate.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={<Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
            iconBgColor="bg-blue-100"
            label="Requirements"
            value={certificate.program_requirements_count}
          />
          <CardInfoItem
            icon={
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
            }
            iconBgColor="bg-indigo-100"
            label="Submissions"
            value={certificate.certificate_submissions_count.toLocaleString()}
          />
          <CardInfoItem
            icon={
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600/70" />
            }
            iconBgColor="bg-amber-100"
            label="Type"
            value={certificate.has_expiration ? "Renewable" : "Lifetime"}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={certificate.created_at}
          updatedAt={certificate.updated_at}
        />
      </CardContent>
    </CardBase>
  );
};

export default CertificateCard;
