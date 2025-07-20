import { CardContent } from "@/components/ui/card";
import type { Certificate } from "@/mock/certificates.mock";
import { Hash, CheckSquare, Upload, ShieldCheck } from "lucide-react";
import CardBase from "../central-dashboard/card-base";
import CardHeaderSection from "../central-dashboard/card-header-section";
import ExpandableCardContent from "../central-dashboard/expandable-card-content";
import CardInfoItem from "../central-dashboard/card-info-item";
import CardFooter from "../central-dashboard/card-footer";
import CardInfoSection from "../central-dashboard/card-info-section";

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <CardBase>
      <CardHeaderSection
        title={certificate.name}
        codes={[certificate.code]}
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
          borderColor="border-indigo-300"
          bgColor="bg-indigo-100"
          textColor="text-indigo-800"
        />

        <CardInfoSection>
          <CardInfoItem
            icon={Hash}
            label="Certificate ID"
            value={`${certificate.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={CheckSquare}
            label="Requirements"
            value={certificate.program_requirements_count}
          />
          <CardInfoItem
            icon={Upload}
            label="Submissions"
            value={certificate.certificate_submissions_count.toLocaleString()}
          />
          <CardInfoItem
            icon={ShieldCheck}
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
