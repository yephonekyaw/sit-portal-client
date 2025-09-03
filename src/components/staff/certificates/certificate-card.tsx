import { CardContent } from "@/components/ui/card";
import type { GetCertificatesItem } from "@/services/staff/certificates/types";
import {
  Hash,
  CheckSquare,
  Upload,
  ShieldCheck,
  FileBadge,
} from "lucide-react";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import ExpandableCardContent from "../dashboard/expandable-card-content";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import CardInfoSection from "../dashboard/card-info-section";
import { useNavigate } from "react-router-dom";
import { useCertificateStore } from "@/stores/staff/certificate.stores";

interface CertificateCardProps {
  certificate: GetCertificatesItem;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const navigate = useNavigate();
  const { setArchiveConfirmModalState, setArchiveCertificateId } =
    useCertificateStore();

  const handleEdit = () => {
    navigate(`/staff/certificates/edit/${certificate.id}`);
  };

  const handleArchive = () => {
    setArchiveCertificateId(certificate.id);
    setArchiveConfirmModalState(true);
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={certificate.certName}
        codes={[certificate.certCode]}
        isActive={certificate.isActive}
        headerIcon={FileBadge}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <CardContent className="pt-0 space-y-6">
        <p className="text-slate-600 leading-relaxed text-sm">
          {certificate.description}
        </p>

        <ExpandableCardContent
          title="Verification Template"
          subtitle="Template used by AI for certificate verification"
          content={certificate.verificationTemplate}
          value="verification-template"
          borderColor="border-blue-200"
          bgColor="bg-blue-50"
          textColor="text-blue-700"
        />

        <CardInfoSection>
          <CardInfoItem
            icon={Hash}
            label="Certificate ID"
            value={`${certificate.id.slice(0, 8)}...`}
            // className="bg-blue-100 text-blue-700 border-blue-200"
          />
          <CardInfoItem
            icon={CheckSquare}
            label="Active Req"
            value={certificate.activeRequirementsCount.toString()}
            // className="bg-purple-100 text-purple-700 border-purple-200"
          />
          <CardInfoItem
            icon={CheckSquare}
            label="Archived Req"
            value={certificate.archivedRequirementsCount.toString()}
            // className="bg-gray-100 text-gray-700 border-gray-200"
          />
          <CardInfoItem
            icon={Upload}
            label="Submissions"
            value={certificate.totalSubmissionsCount.toLocaleString()}
            // className="bg-green-100 text-green-700 border-green-200"
          />
          <CardInfoItem
            icon={ShieldCheck}
            label="Type"
            value={certificate.hasExpiration ? "Renewable" : "Lifetime"}
            // className="bg-orange-100 text-orange-700 border-orange-200"
          />
        </CardInfoSection>

        <CardFooter
          createdAt={certificate.createdAt}
          updatedAt={certificate.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
};

export default CertificateCard;
