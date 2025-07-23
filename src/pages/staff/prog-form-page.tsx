import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, Save } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useProgramFormStore } from "@/stores/staff/program-form.store";
import type { Program } from "@/mock/programs.mock";
import type { ProgramFormSchemaType } from "@/types/staff/programs.types";
import { programFormSchema } from "@/schemas/staff/programs.schemas";

const ProgramFormPage = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const isEdit = !!programId;

  const {
    currentProgram,
    isLoading,
    clearCurrentProgram,
    saveProgram,
    loadProgram,
  } = useProgramFormStore();

  const form = useForm<ProgramFormSchemaType>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      program_code: "",
      program_name: "",
      description: "",
      duration_years: 4,
      is_active: true,
    },
  });

  // Load program data for editing
  useEffect(() => {
    if (isEdit && programId) {
      loadProgram(programId);
    } else {
      clearCurrentProgram();
    }

    return () => {
      clearCurrentProgram();
    };
  }, [programId, isEdit, loadProgram, clearCurrentProgram]);

  // Populate form when program data is loaded
  useEffect(() => {
    if (currentProgram && isEdit) {
      form.reset({
        program_code: currentProgram.program_code,
        program_name: currentProgram.program_name,
        description: currentProgram.description,
        duration_years: currentProgram.duration_years,
        is_active: currentProgram.is_active,
      });
    }
  }, [currentProgram, isEdit, form]);

  const onSubmit = async (data: ProgramFormSchemaType) => {
    try {
      const programData: Omit<
        Program,
        | "id"
        | "created_at"
        | "updated_at"
        | "student_count"
        | "requirement_count"
      > & { id?: string } = {
        ...data,
        ...(isEdit && currentProgram ? { id: currentProgram.id } : {}),
      };

      await saveProgram(programData);
      navigate("/staff/student-management/dashboard/programs");
    } catch (error) {
      console.error("Failed to save program:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/staff/student-management/dashboard/programs");
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
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {isEdit ? "Edit Program" : "Create New Program"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEdit
                  ? "Update program information"
                  : "Add a new academic program"}
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
                    name="program_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., CS-BSc, IT-MSc"
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
                    name="program_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Computer Science"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the program, its focus areas, and objectives..."
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

                {/* Program Settings Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Program Settings
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="duration_years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (Years)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 4)
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
                          <FormLabel>Active Program</FormLabel>
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
                      ? "Update Program"
                      : "Create Program"}
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

export default memo(ProgramFormPage);
