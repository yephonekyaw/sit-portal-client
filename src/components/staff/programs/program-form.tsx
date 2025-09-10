import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, GraduationCap, Save, Info, Settings } from "lucide-react";
import type { ProgramFormProps } from "@/types/staff/program.types";
import { useProgramForm } from "@/hooks/use-program-form";

const ProgramForm = ({ isEdit, programId }: ProgramFormProps) => {
  const {
    form,
    selectedProgram,
    isCreating,
    isUpdating,
    onSubmit,
    handleGoBack,
  } = useProgramForm({ isEdit, programId });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white">
                <GraduationCap className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-blue-900">
                {isEdit ? "Edit Program" : "Create New Program"}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEdit
                  ? "Update program information and settings."
                  : "Add a new academic program to the system."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={`text-xs px-2 py-1 ${
                isEdit
                  ? "bg-orange-100 text-orange-700 border-orange-200"
                  : "bg-green-100 text-green-700 border-green-200"
              }`}
            >
              <Info className="h-3 w-3 mr-1" />
              {isEdit ? "Edit Mode" : "Create Mode"}
            </Badge>
            <div
              className="p-2 bg-white hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors cursor-pointer"
              title="Back to Programs"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <Info className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Basic Information
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Enter the core details that identify and describe this
                        academic program.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="programCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Program Code <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., BSc.CS, MSc.IT"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="programName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Program Name <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Computer Science"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
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
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Description <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the program, its focus areas, and objectives..."
                              className="min-h-24 w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Settings Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <Settings className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Program Settings
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Configure the duration and availability of this program.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="durationYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Duration (Years){" "}
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 4)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleGoBack}
                disabled={
                  form.formState.isSubmitting || isCreating || isUpdating
                }
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  isCreating ||
                  isUpdating ||
                  selectedProgram?.isActive === false
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                {form.formState.isSubmitting || isCreating || isUpdating
                  ? "Saving..."
                  : isEdit
                  ? "Update Program"
                  : "Create Program"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProgramForm;
