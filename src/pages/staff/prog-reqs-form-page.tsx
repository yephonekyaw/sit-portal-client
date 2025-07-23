import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { certificates } from "@/mock/certificates.mock";
import { programs } from "@/mock/programs.mock";
import { programRequirementFormSchema } from "@/schemas/staff/prog-reqs.schemas";
import { useProgramRequirementFormStore } from "@/stores/staff/prog-reqs-form.store";
import type { ProgramRequirementFormSchemaType } from "@/types/staff/prog-reqs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookCheck, Save } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const ProgramRequirementFormPage = () => {
  const navigate = useNavigate();
  const { requirementId } = useParams();
  const isEdit = !!requirementId;

  const {
    currentRequirement,
    isLoading,
    clearCurrentRequirement,
    saveRequirement,
    loadRequirement,
  } = useProgramRequirementFormStore();

  const form = useForm<ProgramRequirementFormSchemaType>({
    resolver: zodResolver(programRequirementFormSchema),
    defaultValues: {
      name: "",
      program_id: "",
      cert_type_id: "",
      target_year: 1,
      deadline_month: 6,
      deadline_day: 15,
      is_mandatory: true,
      special_instruction: "",
      is_active: true,
      recurrence_type: "annual",
    },
  });

  // Load requirement data for editing
  useEffect(() => {
    if (isEdit && requirementId) {
      loadRequirement(requirementId);
    } else {
      clearCurrentRequirement();
    }

    return () => {
      clearCurrentRequirement();
    };
  }, [requirementId, isEdit, loadRequirement, clearCurrentRequirement]);

  // Populate form when requirement data is loaded
  useEffect(() => {
    if (currentRequirement && isEdit) {
      form.reset({
        name: currentRequirement.name,
        program_id: currentRequirement.program.program_code,
        cert_type_id: currentRequirement.certificate_type.code,
        target_year: currentRequirement.target_year,
        deadline_month: currentRequirement.deadline_month,
        deadline_day: currentRequirement.deadline_day,
        is_mandatory: currentRequirement.is_mandatory,
        special_instruction: currentRequirement.special_instruction || "",
        is_active: currentRequirement.is_active,
        recurrence_type:
          currentRequirement.recurrence_type as ProgramRequirementFormSchemaType["recurrence_type"],
      });
    }
  }, [currentRequirement, isEdit, form]);

  const onSubmit = async (data: ProgramRequirementFormSchemaType) => {
    try {
      const selectedProgram = programs.find(
        (p) => p.program_code === data.program_id
      );
      const selectedCertType = certificates.find(
        (c) => c.code === data.cert_type_id
      );

      if (!selectedProgram || !selectedCertType) {
        throw new Error("Selected program or certificate type not found");
      }

      const requirementData = {
        ...data,
        program: { program_code: selectedProgram.program_code },
        certificate_type: {
          code: selectedCertType.code,
          name: selectedCertType.name,
        },
        ...(isEdit && currentRequirement ? { id: currentRequirement.id } : {}),
      };

      await saveRequirement(requirementData);
      navigate("/staff/student-management/dashboard/requirements");
    } catch (error) {
      console.error("Failed to save requirement:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/staff/student-management/dashboard/requirements");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="text-muted-foreground hover:text-foreground hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {isEdit
                  ? "Edit Program Requirement"
                  : "Create New Program Requirement"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEdit
                  ? "Update requirement information"
                  : "Add a new program requirement"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-blue-200/50 bg-white">
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Basic Information
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirement Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., CITI RCR Certificate for CS-BSc"
                            className="w-full"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="program_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem
                                key={program.id}
                                value={program.program_code}
                              >
                                {program.program_code} - {program.program_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cert_type_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select certificate type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {certificates.map((cert) => (
                              <SelectItem key={cert.id} value={cert.code}>
                                {cert.code} - {cert.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Schedule & Timeline Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Schedule & Timeline
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="target_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 1)
                            }
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline_month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline Month</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          value={field.value.toString()}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem
                                key={month.value}
                                value={month.value.toString()}
                              >
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline_day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline Day</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="31"
                            className="w-full"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 15)
                            }
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recurrence_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recurrence Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select recurrence" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="once">Once</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Additional Details
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="special_instruction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional requirements or instructions for students..."
                            className="min-h-24 w-full"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Settings Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Settings
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="is_mandatory"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                            className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Mandatory</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                            className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-8 border-t border-blue-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoBack}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading
                      ? "Saving..."
                      : isEdit
                      ? "Update Requirement"
                      : "Create Requirement"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(ProgramRequirementFormPage);
