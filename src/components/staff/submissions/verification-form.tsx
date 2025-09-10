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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle,
  Save,
  Info,
  Settings,
  User,
  AlertTriangle,
  TicketCheck,
} from "lucide-react";
import { getInitialsOneInput } from "@/utils/common.utils";
import { useVerificationForm } from "@/hooks/use-verification-form";

const VerificationForm = () => {
  const {
    form,
    selectedSubmission,
    submissionRelatedDetail,
    onSubmit,
    handleGoBack,
    isSubmitting,
    isVerifying,
  } = useVerificationForm();

  if (!selectedSubmission) {
    return (
      <div className="w-full space-y-6">
        <Card className="shadow-none border border-red-100">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center text-red-600">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>No submission selected for verification</p>
              <button
                onClick={handleGoBack}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Go back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white">
                <TicketCheck className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-blue-900">
                Manual Verification
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Review and verify the submitted certificate document.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="text-xs px-2 py-1 bg-amber-100 text-amber-700 border-amber-200">
              <Info className="h-3 w-3 mr-1" />
              Verification Mode
            </Badge>
            <div
              className="p-2 bg-white hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors cursor-pointer"
              title="Back to Submissions"
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
            {/* Submission Details Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Submission Details
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Review the submission details and student information.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Student Details */}
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 bg-blue-500">
                        <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                          {getInitialsOneInput(selectedSubmission.studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-base">
                          {selectedSubmission.studentName}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge className="bg-blue-500 text-white border-0 text-sm">
                            {selectedSubmission.studentId}
                          </Badge>
                          <Badge className="bg-blue-500 text-white border-0 text-sm">
                            {submissionRelatedDetail?.programCode || "N/A"}
                          </Badge>
                          <Badge className="bg-blue-500 text-white border-0 text-sm">
                            {submissionRelatedDetail?.certCode || "N/A"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Submission & Schedule IDs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="submissionId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Submission ID{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Submission ID"
                                className="w-full border-gray-200 bg-gray-50"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="scheduleId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Schedule ID{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Schedule ID"
                                className="w-full border-gray-200 bg-gray-50"
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Decision Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Verification Decision
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Make your verification decision and provide any
                        necessary comments or reasons.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Verification Status{" "}
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200">
                                <SelectValue placeholder="Select verification status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="approved">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Approved</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="rejected">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                    <span>Rejected</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information Section */}
            <Card className="shadow-none border border-blue-100">
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                      <Settings className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2 text-base">
                        Additional Information
                      </h4>
                      <p className="text-sm text-blue-800 leading-relaxed mb-4">
                        Provide optional comments and reasons for your
                        verification decision.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Comments
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any comments about the verification decision..."
                              className="min-h-24 w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reasons"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Reasons
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide specific reasons for your verification decision..."
                              className="min-h-24 w-full border-gray-200 focus:border-blue-300 focus:ring-blue-200 resize-none"
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

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleGoBack}
                disabled={isSubmitting || isVerifying}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isVerifying}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                {isSubmitting || isVerifying
                  ? "Submitting..."
                  : "Submit Verification"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerificationForm;
