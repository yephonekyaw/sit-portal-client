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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown } from "lucide-react";
import type { DeadlineSettingsSectionProps } from "@/types/staff/prog-req.types";
import { MONTH_OPTIONS } from "@/utils/staff/prog-req.utils";

export const DeadlineSettingsSection = ({
  form,
  maxTargetYear,
  availableDays,
}: DeadlineSettingsSectionProps) => {
  return (
    <Card className="shadow-none border border-blue-100">
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2 text-base">
                Deadline Settings
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed mb-4">
                Configure when this requirement is due and notification
                settings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <FormField
              control={form.control}
              name="targetYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="targetYear"
                    className="text-sm font-medium text-gray-700"
                  >
                    Target Year
                  </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                        >
                          Year {field.value}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={4}
                        className="p-0"
                        style={{
                          width: "var(--radix-dropdown-menu-trigger-width)",
                          minWidth: "var(--radix-dropdown-menu-trigger-width)",
                        }}
                      >
                        {Array.from(
                          { length: maxTargetYear },
                          (_, i) => i + 1
                        ).map((year) => (
                          <DropdownMenuItem
                            key={year}
                            onClick={() => field.onChange(year)}
                          >
                            Year {year}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadlineMonth"
              render={({ field }) => {
                const selectedMonth = MONTH_OPTIONS.find(
                  (m) => m.value === field.value
                );
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor="deadlineMonth"
                      className="text-sm font-medium text-gray-700"
                    >
                      Deadline Month
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                          >
                            {selectedMonth?.label || "Select month"}
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
                          {MONTH_OPTIONS.map((month) => (
                            <DropdownMenuItem
                              key={month.value}
                              onClick={() => field.onChange(month.value)}
                            >
                              {month.label}
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
              name="deadlineDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="deadlineDay"
                    className="text-sm font-medium text-gray-700"
                  >
                    Deadline Day
                  </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                        >
                          {field.value}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={4}
                        className="p-0"
                        style={{
                          width: "var(--radix-dropdown-menu-trigger-width)",
                          minWidth: "var(--radix-dropdown-menu-trigger-width)",
                        }}
                      >
                        {availableDays.map((day) => (
                          <DropdownMenuItem
                            key={day}
                            onClick={() => field.onChange(day)}
                          >
                            {day}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="gracePeriodDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="gracePeriodDays"
                    className="text-sm font-medium text-gray-700"
                  >
                    Grace Period (Days)
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="gracePeriodDays"
                      type="number"
                      min="0"
                      max="365"
                      className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of days after the deadline during which
                    submissions will still be accepted with overdue status.
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
                  <FormLabel
                    htmlFor="notificationDaysBeforeDeadline"
                    className="text-sm font-medium text-gray-700"
                  >
                    Notification Days Before
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="notificationDaysBeforeDeadline"
                      type="number"
                      min="0"
                      max="365"
                      className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of days before the deadline when notifications
                    will start sending.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
