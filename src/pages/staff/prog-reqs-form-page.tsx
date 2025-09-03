import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramRequirementForm from "@/components/staff/prog-requirements/prog-req-form";
import { useGetProgramRequirements } from "@/services/staff/prog-reqs/queries";
import { useProgramRequirementStore } from "@/stores/staff/prog-reqs.stores";
import DefaultLoader from "@/components/ui/default-loader";
import { toast } from "sonner";

const ProgramRequirementFormPage = () => {
  const { requirementId } = useParams();
  const isEdit = !!requirementId;
  const {
    data: requirements,
    isLoading,
    isSuccess,
    isError,
  } = useGetProgramRequirements();
  const { setSelectedRequirement } = useProgramRequirementStore();
  const navigate = useNavigate();

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load requirement data");
      navigate("/staff/requirements/new");
    }
  }, [isError, navigate]);

  // Handle edit mode setup
  useEffect(() => {
    if (!isEdit || !isSuccess) return;

    const requirement = requirements?.data?.find(
      (req) => req.id === requirementId
    );

    if (!requirement) {
      toast.error("Requirement ID not found to edit");
      navigate("/staff/requirements/new");
      return;
    }

    setSelectedRequirement(requirement);
  }, [
    isEdit,
    isSuccess,
    requirementId,
    requirements?.data,
    navigate,
    setSelectedRequirement,
  ]);

  if (isLoading) {
    return <DefaultLoader label="Loading requirement data..." />;
  }

  return (
    <ProgramRequirementForm isEdit={isEdit} requirementId={requirementId} />
  );
};

export default ProgramRequirementFormPage;
