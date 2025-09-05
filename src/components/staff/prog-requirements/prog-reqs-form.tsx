import { Form } from "@/components/ui/form";
import { memo } from "react";
import type { ProgramRequirementFormProps } from "@/types/staff/prog-req.types";
import { useProgramRequirementForm } from "../../../hooks/use-program-requirement-form";
import { FormHeader } from "./form-header";
import { BasicInformationSection } from "./basic-information-section";
import { DeadlineSettingsSection } from "./deadline-settings-section";
import { AdvancedSettingsSection } from "./advanced-settings-section";
import { FormActions } from "./form-actions";

const ProgramRequirementForm = (props: ProgramRequirementFormProps) => {
  const {
    form,
    programs,
    certificates,
    isLoadingPrograms,
    isLoadingCertificates,
    isCreating,
    isUpdating,
    currentYear,
    maxTargetYear,
    availableDays,
    yearOptions,
    onSubmit,
    handleGoBack,
  } = useProgramRequirementForm(props);

  return (
    <div className="w-full space-y-6">
      <FormHeader isEdit={props.isEdit} onGoBack={handleGoBack} />

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInformationSection
              form={form}
              programs={programs}
              certificates={certificates}
              isEdit={props.isEdit}
              isLoadingPrograms={isLoadingPrograms}
              isLoadingCertificates={isLoadingCertificates}
            />

            <DeadlineSettingsSection
              form={form}
              maxTargetYear={maxTargetYear}
              availableDays={availableDays}
            />

            <AdvancedSettingsSection
              form={form}
              yearOptions={yearOptions}
              currentYear={currentYear}
            />

            <FormActions
              isEdit={props.isEdit}
              isSubmitting={form.formState.isSubmitting}
              isCreating={isCreating}
              isUpdating={isUpdating}
              onGoBack={handleGoBack}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default memo(ProgramRequirementForm);
