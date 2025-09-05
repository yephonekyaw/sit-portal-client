import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Info, ChevronDown } from "lucide-react";
import type { BasicInformationSectionProps } from "@/types/staff/prog-req.types";

export const BasicInformationSection = ({
  form,
  programs,
  certificates,
  isEdit,
  isLoadingPrograms,
  isLoadingCertificates,
}: BasicInformationSectionProps) => {
  return (
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
                Enter the core details that identify and describe this program
                requirement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => {
                const selectedProgram = programs?.data?.find(
                  (p) => p.id === field.value
                );
                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Program
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            disabled={isEdit || isLoadingPrograms}
                          >
                            {selectedProgram
                              ? `${selectedProgram.programCode} - ${selectedProgram.programName}`
                              : "Select a program"}
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
                          {programs?.data?.map((program) => (
                            <DropdownMenuItem
                              key={program.id}
                              onClick={() => field.onChange(program.id)}
                            >
                              {program.programCode} - {program.programName}
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
              name="certTypeId"
              render={({ field }) => {
                const selectedCert = certificates?.data?.find(
                  (c) => c.id === field.value
                );
                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Certificate Type
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                            disabled={isEdit || isLoadingCertificates}
                          >
                            {selectedCert
                              ? `${selectedCert.certCode} - ${selectedCert.certName}`
                              : "Select a certificate type"}
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
                          {certificates?.data?.map((cert) => (
                            <DropdownMenuItem
                              key={cert.id}
                              onClick={() => field.onChange(cert.id)}
                            >
                              {cert.certCode} - {cert.certName}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Requirement Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="e.g., Capstone Project Submission"
                    className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 font-medium"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialInstruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="specialInstruction"
                  className="text-sm font-medium text-gray-700"
                >
                  Special Instructions
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="specialInstruction"
                    placeholder="Any special instructions or additional information for students..."
                    className="min-h-24 w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 font-medium"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
