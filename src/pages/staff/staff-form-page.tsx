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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, UserPlus, Save, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addStaffFormSchema,
  type AddStaffFormSchemaType,
} from "@/schemas/staff/staff.schemas";
import { mockPrograms, mockRoles, addMockStaffMember } from "@/mock/staff.mock";

const StaffFormPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddStaffFormSchemaType>({
    resolver: zodResolver(addStaffFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      employee_id: "",
      department: "",
      program_permissions: [
        {
          program_id: "",
          role_id: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "program_permissions",
  });

  const onSubmit = async (data: AddStaffFormSchemaType) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add the new staff member (in real app, this would be an API call)
      const newStaffMember = addMockStaffMember(data);
      console.log("Added staff member:", newStaffMember);

      // Navigate back to staff management
      navigate("/staff/staff-management");
    } catch (error) {
      console.error("Failed to add staff member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/staff/staff-management");
  };

  const addPermission = () => {
    append({
      program_id: "",
      role_id: "",
    });
  };

  const removePermission = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 space-y-6">
      {/* Page Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">
                Add New Staff Member
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Create a new staff account with program permissions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleGoBack}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Staff Management
            </Button>
          </div>
        </div>
      </header>

      {/* Form */}
      <Card className="shadow-lg border-blue-200/50 bg-white">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
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
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@sit.edu.sg"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Employment Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Employment Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="EMP001"
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Computer Science"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Program Permissions Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 pb-2 border-b border-blue-100 flex-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Program Permissions
                    </h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPermission}
                    disabled={isLoading}
                    className="ml-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Permission
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="relative">
                      <Badge
                        variant="outline"
                        className="absolute -top-2 left-3 bg-white px-2 z-10"
                      >
                        Permission {index + 1}
                      </Badge>
                      <div className="border rounded-lg p-4 pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`program_permissions.${index}.program_id`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Program</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select program" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {mockPrograms.map((program) => (
                                        <SelectItem
                                          key={program.id}
                                          value={program.id}
                                        >
                                          {program.program_code} -{" "}
                                          {program.program_name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`program_permissions.${index}.role_id`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {mockRoles.map((role) => (
                                        <SelectItem
                                          key={role.id}
                                          value={role.id}
                                        >
                                          {role.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-center items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removePermission(index)}
                              disabled={isLoading || fields.length <= 1}
                              className="text-red-500 hover:text-red-700 hover:bg-red-500 border border-red-200"
                            >
                              <Trash className="h-2 w-2" />
                              <span className="text-xs">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  {isLoading ? "Adding Staff..." : "Add Staff Member"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffFormPage;
