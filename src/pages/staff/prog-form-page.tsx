import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramForm from "@/components/staff/programs/program-form";
import { useGetPrograms } from "@/services/staff/programs/queries";
import { useProgramStore } from "@/stores/staff/program.stores";
import { toast } from "sonner";
import DefaultLoader from "@/components/ui/default-loader";

const ProgramFormPage = () => {
  const { programId } = useParams();
  const isEdit = !!programId;

  const { data: programs, isLoading, isError, isSuccess } = useGetPrograms();
  const { setSelectedProgram } = useProgramStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load program data");
      navigate("/staff/programs/new");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (!isEdit || !isSuccess) return;

    const program = programs?.data?.find((prog) => prog.id === programId);

    if (!program) {
      toast.error("Program ID not found to edit");
      navigate("/staff/programs/new");
      return;
    }

    setSelectedProgram(program);
  }, [
    isEdit,
    isSuccess,
    programId,
    programs?.data,
    navigate,
    setSelectedProgram,
  ]);

  if (isLoading) {
    return <DefaultLoader label="Loading program data..." />;
  }

  return <ProgramForm isEdit={isEdit} programId={programId} />;
};

export default ProgramFormPage;
