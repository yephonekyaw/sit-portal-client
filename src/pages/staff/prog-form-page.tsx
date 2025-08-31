import { memo } from "react";
import { useParams } from "react-router-dom";
import ProgramForm from "@/components/staff/programs/program-form";

const ProgramFormPage = () => {
  const { programId } = useParams();
  const isEdit = !!programId;

  return <ProgramForm isEdit={isEdit} programId={programId} />;
};

export default memo(ProgramFormPage);
