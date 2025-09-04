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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Save, Info, Settings } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useScheduleStore } from "@/stores/staff/schedules.stores";
import { useGetProgramRequirements } from "@/services/staff/prog-reqs/queries";
import { useGetAcademicYears } from "@/services/staff/academic-years/queries";
import type {
  ScheduleFormProps,
  ScheduleFormSchemaType,
} from "@/types/staff/schedules.types";
import { scheduleFormSchema } from "@/schemas/staff/schedules.schemas";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "@/services/staff/schedules/mutations";

const ScheduleForm = ({ isEdit, scheduleId }: ScheduleFormProps) => {
  const navigate = useNavigate();
  const { selectedSchedule } = useScheduleStore();
  const { mutateAsync: create, isPending: isCreating } = useCreateSchedule();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateSchedule();
  const { data: programRequirements } = useGetProgramRequirements();
  const { data: academicYears } = useGetAcademicYears();

  const form = useForm<ScheduleFormSchemaType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      programRequirementId: "",
      academicYearId: "",
      submissionDeadline: "",
      gracePeriodDays: undefined,
      notificationDaysBeforeDeadline: undefined,
    },
  });

  // Populate form when schedule data is loaded
  useEffect(() => {
    if (selectedSchedule && isEdit) {
      form.reset({
        programRequirementId: selectedSchedule.programRequirementId,
        academicYearId: selectedSchedule.academicYearId,
        submissionDeadline: selectedSchedule.submissionDeadline,
        gracePeriodDays: undefined, // Use defaults from program requirement
        notificationDaysBeforeDeadline: undefined, // Use defaults from program requirement
      });
    }
  }, [selectedSchedule, isEdit, form]);

  const onSubmit = async (data: ScheduleFormSchemaType) => {
    if (isEdit && scheduleId) {
      await update({
        id: scheduleId,
        ...data,
      });
    } else {
      await create(data);
    }
  };

  const handleGoBack = () => {
    navigate("/staff/student-management/dashboard/schedules");
  };

  // Academic years are now fetched from the API

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white">
                <Calendar className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-blue-900">
                {isEdit ? "Edit Schedule" : "Create New Schedule"}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEdit
                  ? "Update program requirement schedule information and settings."
                  : "Add a new program requirement schedule to the system."}
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
              title="Back to Schedules"
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
                        Schedule Information
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Select the program requirement and academic year for this
                        schedule.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="programRequirementId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Program Requirement
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200">
                                <SelectValue placeholder="Select a program requirement" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {programRequirements?.data?.map((requirement) => (
                                <SelectItem
                                  key={requirement.id}
                                  value={requirement.id}
                                >
                                  {requirement.name} ({requirement.programCode} -{" "}
                                  {requirement.certCode})
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
                      name="academicYearId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Academic Year
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200">
                                <SelectValue placeholder="Select academic year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {academicYears?.data?.map((year) => (
                                <SelectItem
                                  key={year.id}
                                  value={year.id}
                                >
                                  {year.yearCode}
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
                      name="submissionDeadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Submission Deadline
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
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

            {/* Schedule Settings Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <Settings className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Schedule Settings
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Configure grace period and notification settings. Leave
                        empty to use defaults from program requirement.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="gracePeriodDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Grace Period (Days)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="365"
                              placeholder="Leave empty for program requirement default"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? parseInt(e.target.value) : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notificationDaysBeforeDeadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Notification Days Before Deadline
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="365"
                              placeholder="Leave empty for program requirement default"
                              className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? parseInt(e.target.value) : undefined
                                )
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
                  isUpdating
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                {form.formState.isSubmitting || isCreating || isUpdating
                  ? "Saving..."
                  : isEdit
                  ? "Update Schedule"
                  : "Create Schedule"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ScheduleForm;