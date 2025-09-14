import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Save,
  Info,
  Settings,
  ChevronDown,
  Clock,
} from "lucide-react";
import type { ScheduleFormProps } from "@/types/staff/schedule.types";
import { useScheduleForm } from "@/hooks/use-schedule-form";
import { format } from "date-fns";

const ScheduleForm = ({ isEdit, scheduleId }: ScheduleFormProps) => {
  const {
    form,
    programRequirements,
    academicYears,
    isCreating,
    isUpdating,
    onSubmit,
    handleGoBack,
  } = useScheduleForm({ isEdit, scheduleId });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="rounded-2xl space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-600">
              <AvatarFallback className="bg-transparent text-white">
                <CalendarIcon className="h-6 w-6" />
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
                        Select the program requirement and academic year for
                        this schedule.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="programRequirementId"
                      render={({ field }) => {
                        const selectedRequirement =
                          programRequirements?.data?.find(
                            (req) => req.id === field.value
                          );
                        return (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Program Requirement{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                                    disabled={isEdit}
                                  >
                                    {selectedRequirement
                                      ? `${selectedRequirement.name} (${selectedRequirement.programCode} - ${selectedRequirement.certCode})`
                                      : "Select a program requirement"}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="start"
                                  sideOffset={4}
                                  className="p-0 w-full"
                                  style={{
                                    width:
                                      "var(--radix-dropdown-menu-trigger-width)",
                                    minWidth:
                                      "var(--radix-dropdown-menu-trigger-width)",
                                  }}
                                >
                                  {programRequirements?.data?.map(
                                    (requirement) => (
                                      <DropdownMenuItem
                                        key={requirement.id}
                                        onSelect={() =>
                                          field.onChange(requirement.id)
                                        }
                                      >
                                        {requirement.name} (
                                        {requirement.programCode} -{" "}
                                        {requirement.certCode})
                                      </DropdownMenuItem>
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="academicYearId"
                      render={({ field }) => {
                        const selectedYear = academicYears?.data?.find(
                          (year) => year.id === field.value
                        );
                        return (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Academic Year{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                                    disabled={isEdit}
                                  >
                                    {selectedYear
                                      ? selectedYear.yearCode
                                      : "Select academic year"}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="start"
                                  sideOffset={4}
                                  className="p-0"
                                  style={{
                                    width:
                                      "var(--radix-dropdown-menu-trigger-width)",
                                    minWidth:
                                      "var(--radix-dropdown-menu-trigger-width)",
                                  }}
                                >
                                  {academicYears?.data?.map((year) => (
                                    <DropdownMenuItem
                                      key={year.id}
                                      onSelect={() => field.onChange(year.id)}
                                    >
                                      {year.yearCode}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <div className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Submission Deadline{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <FormField
                          control={form.control}
                          name="submissionDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-gray-600">
                                Date
                              </FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                                    >
                                      {field.value
                                        ? format(
                                            new Date(field.value),
                                            "yyyy-MM-dd"
                                          )
                                        : "Select date"}
                                      <CalendarIcon className="h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) => {
                                        field.onChange(
                                          format(date!, "yyyy-MM-dd")
                                        );
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="submissionTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-gray-600">
                                Time
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="time"
                                    step="1"
                                    className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none pl-10 font-medium"
                                    {...field}
                                  />
                                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
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
                                  e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            The number of days after the deadline during which
                            submissions will still be accepted with overdue
                            status.
                          </FormDescription>
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
                                  e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            The number of days before the deadline when
                            notifications will start sending.
                          </FormDescription>
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
                  form.formState.isSubmitting || isCreating || isUpdating
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
