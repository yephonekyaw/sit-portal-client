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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ShieldCheck,
  Save,
  Info,
  Settings,
  FileText,
} from "lucide-react";
import type { CertificateFormProps } from "@/types/staff/certificates.types";
import { useCertificateForm } from "@/hooks/use-certificate-form";

const CertificateForm = ({ isEdit, certificateId }: CertificateFormProps) => {
  const {
    form,
    isUpdating,
    onSubmit,
    handleGoBack,
  } = useCertificateForm({ isEdit, certificateId });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white">
                <ShieldCheck className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-blue-900">
                {isEdit ? "Edit Certificate" : "Create New Certificate"}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isEdit
                  ? "Update certificate information and verification template."
                  : "Add a new certificate type to the system."}
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
              title="Back to Certificates"
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
                        certificate type.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="certCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Certificate Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., CITI-PROG, HIPAA-CERT"
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
                      name="certName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Certificate Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., CITI Program Certificate"
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
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the certificate type, its purpose, and requirements..."
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

            {/* Verification Template Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        AI Verification Template
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Configure the AI prompt template used for certificate
                        verification.
                        {isEdit && (
                          <span className="block mt-2 text-blue-700 font-medium">
                            Note: The system-managed "REQUIRED DATA INPUT"
                            section is preserved automatically. Markdown is
                            preferred.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="verificationTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Verification Template
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the AI prompt template for certificate verification..."
                              className="min-h-64 w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 font-mono text-sm"
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

            {/* Certificate Settings Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <Settings className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Certificate Settings
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Configure the expiration behavior for this certificate
                        type.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hasExpiration"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Certificate has expiration date
                            </FormLabel>
                          </div>
                          <p className="text-xs text-gray-500 ml-6">
                            Check this if certificates of this type can expire
                            and need renewal
                          </p>
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
                disabled={form.formState.isSubmitting || isUpdating}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={form.formState.isSubmitting || isUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                {form.formState.isSubmitting || isUpdating
                  ? "Saving..."
                  : isEdit
                  ? "Update Certificate"
                  : "Create Certificate"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CertificateForm;
