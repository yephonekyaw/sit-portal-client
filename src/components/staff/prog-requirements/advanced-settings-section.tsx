import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, ChevronDown } from "lucide-react";
import type { AdvancedSettingsSectionProps } from "@/types/staff/prog-reqs.types";
import { ProgReqRecurrenceType } from "@/schemas/staff/prog-reqs.schemas";

export const AdvancedSettingsSection = ({
  form,
  yearOptions,
  currentYear,
}: AdvancedSettingsSectionProps) => {
  return (
    <Card className="shadow-none border border-blue-100">
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
              <Settings className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2 text-base">
                Advanced Settings
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed mb-4">
                Configure additional settings for this requirement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="recurrenceType"
              render={({ field }) => {
                const getRecurrenceLabel = (value: string) => {
                  return value === ProgReqRecurrenceType.ONCE
                    ? "Once"
                    : "Annual";
                };
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="recurrenceType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Recurrence Type
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                          >
                            {getRecurrenceLabel(field.value)}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={4}
                          className="p-0"
                          style={{
                            width: "var(--radix-dropdown-menu-trigger-width)",
                            minWidth:
                              "var(--radix-dropdown-menu-trigger-width)",
                          }}
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              field.onChange(ProgReqRecurrenceType.ONCE)
                            }
                          >
                            Once
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              field.onChange(ProgReqRecurrenceType.ANNUAL)
                            }
                          >
                            Annual
                          </DropdownMenuItem>
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
              name="monthsBeforeDeadline"
              render={({ field }) => {
                const value = field.value ?? 3;
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="monthsBeforeDeadline"
                      className="text-sm font-medium text-gray-700"
                    >
                      Schedule Creation Months Before
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                          >
                            {value} month{value > 1 ? "s" : ""} before
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={4}
                          className="p-0"
                          style={{
                            width: "var(--radix-dropdown-menu-trigger-width)",
                            minWidth:
                              "var(--radix-dropdown-menu-trigger-width)",
                          }}
                        >
                          {Array.from({ length: 6 }, (_, i) => i + 1).map(
                            (month) => (
                              <DropdownMenuItem
                                key={month}
                                onClick={() => field.onChange(month)}
                              >
                                {month} month{month > 1 ? "s" : ""} before
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormDescription>
                      The number of months before the deadline when a
                      requirement schedule will be created.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="effectiveFromYear"
              render={({ field }) => {
                const value = field.value ?? currentYear;
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="effectiveFromYear"
                      className="text-sm font-medium text-gray-700"
                    >
                      Effective From Year
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                          >
                            {value}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={4}
                          className="p-0"
                          style={{
                            width: "var(--radix-dropdown-menu-trigger-width)",
                            minWidth:
                              "var(--radix-dropdown-menu-trigger-width)",
                          }}
                        >
                          {yearOptions.map((year) => (
                            <DropdownMenuItem
                              key={year}
                              onClick={() => field.onChange(year)}
                            >
                              {year}
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

            <FormField
              control={form.control}
              name="effectiveUntilYear"
              render={({ field }) => {
                const value = field.value ?? currentYear + 1;
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="effectiveUntilYear"
                      className="text-sm font-medium text-gray-700"
                    >
                      Effective Until Year
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                          >
                            {value}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={4}
                          className="p-0"
                          style={{
                            width: "var(--radix-dropdown-menu-trigger-width)",
                            minWidth:
                              "var(--radix-dropdown-menu-trigger-width)",
                          }}
                        >
                          {yearOptions.map((year) => (
                            <DropdownMenuItem
                              key={year}
                              onClick={() => field.onChange(year)}
                            >
                              {year}
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
          </div>

          <FormField
            control={form.control}
            name="isMandatory"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel htmlFor="isMandatory">
                    Mandatory Requirement
                  </FormLabel>
                  <div className="text-[0.8rem] text-muted-foreground">
                    Students must complete this requirement to graduate.
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
