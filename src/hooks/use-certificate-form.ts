import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCertificateStore } from "@/stores/staff/certificate.stores";
import { useUpdateCertificate } from "@/services/staff/certificates/mutations";
import { certificateFormSchema } from "@/schemas/staff/certificates.schemas";
import type {
  CertificateFormProps,
  CertificateFormSchemaType,
} from "@/types/staff/certificates.types";

// Helper functions for template handling
const REQUIRED_DATA_MARKER = "**REQUIRED DATA INPUT:**";

const removeRequiredDataSection = (template: string): string => {
  if (!template.includes(REQUIRED_DATA_MARKER)) {
    return template;
  }

  const parts = template.split(REQUIRED_DATA_MARKER);
  return parts[0].trim();
};

const addRequiredDataSection = (
  editableTemplate: string,
  originalTemplate: string
): string => {
  if (!originalTemplate.includes(REQUIRED_DATA_MARKER)) {
    return editableTemplate;
  }

  const originalParts = originalTemplate.split(REQUIRED_DATA_MARKER);
  const requiredDataSection = REQUIRED_DATA_MARKER + originalParts[1];

  return editableTemplate.trim() + "\n\n" + requiredDataSection;
};

export const useCertificateForm = ({
  isEdit,
  certificateId,
}: CertificateFormProps) => {
  const navigate = useNavigate();
  const [originalTemplate, setOriginalTemplate] = useState("");
  const { selectedCertificate } = useCertificateStore();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateCertificate();

  const form = useForm<CertificateFormSchemaType>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      certCode: "",
      certName: "",
      description: "",
      verificationTemplate: "",
      hasExpiration: false,
    },
  });

  // Populate form when certificate data is loaded
  useEffect(() => {
    if (selectedCertificate && isEdit) {
      const editableTemplate = removeRequiredDataSection(
        selectedCertificate.verificationTemplate
      );
      setOriginalTemplate(selectedCertificate.verificationTemplate);

      form.reset({
        certCode: selectedCertificate.certCode,
        certName: selectedCertificate.certName,
        description: selectedCertificate.description,
        verificationTemplate: editableTemplate,
        hasExpiration: selectedCertificate.hasExpiration,
      });
    }
  }, [selectedCertificate, isEdit, form]);

  const onSubmit = async (data: CertificateFormSchemaType) => {
    // Reconstruct the full template with the required data section
    const fullTemplate = isEdit
      ? addRequiredDataSection(data.verificationTemplate, originalTemplate)
      : data.verificationTemplate;

    const submitData = {
      ...data,
      verificationTemplate: fullTemplate,
    };

    if (isEdit && certificateId) {
      await update({ id: certificateId, ...submitData });
    }
  };

  const handleGoBack = () => {
    navigate("/staff/student-management/dashboard/certificates");
  };

  return {
    form,
    isUpdating,
    onSubmit,
    handleGoBack,
    isEdit,
  };
};