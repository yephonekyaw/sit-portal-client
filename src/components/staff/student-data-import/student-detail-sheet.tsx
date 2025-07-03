import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, RotateCcw, Trash2, Check, PlusCircle } from "lucide-react";

import { parsedFileStudentRecordSchema } from "@/schemas/staff/student-data-import/schemas";
import type {
  ParsedFileStudentRecordSchemaType,
  StudentDetailSheetProps,
} from "@/types/staff/student-data-import/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const StudentDetailSheet = (props: StudentDetailSheetProps) => {
  const { recordManager, mode } = props;
  const {
    isSheetOpen,
    selectedRecord,
    handleCloseSheet,
    handleUpdateRecord,
    handleDeleteRecord,
    handleAddRecord,
  } = recordManager;

  const editableRecordFields = useMemo(
    () => ({
      name: selectedRecord?.name || "",
      email: selectedRecord?.email || "",
      studentId: selectedRecord?.studentId || "",
      programCode: selectedRecord?.programCode as
        | "CS"
        | "DSI"
        | "IT"
        | undefined,
      academicYear: selectedRecord?.academicYear || "",
    }),
    [
      selectedRecord?.name,
      selectedRecord?.email,
      selectedRecord?.studentId,
      selectedRecord?.programCode,
      selectedRecord?.academicYear,
    ]
  );

  const form = useForm<ParsedFileStudentRecordSchemaType>({
    resolver: zodResolver(parsedFileStudentRecordSchema),
    defaultValues: editableRecordFields,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(editableRecordFields);
  }, [editableRecordFields, form]);

  function onSubmit(data: ParsedFileStudentRecordSchemaType) {
    if (mode === "add") {
      handleAddRecord(data);
      return;
    }
    // Edit mode
    handleUpdateRecord({
      ...data,
      id: selectedRecord!.id,
      sourceFile: selectedRecord?.sourceFile || "Manual Entry",
    });
  }

  function handleReset() {
    form.reset(editableRecordFields);
  }

  function handleDelete() {
    if (mode === "edit" && selectedRecord) {
      handleDeleteRecord(selectedRecord.id);
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="text-left">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-xl font-bold text-blue-900">
                {mode === "add" ? "Add New Record" : "Student Details"}
              </SheetTitle>
              <SheetDescription>
                {mode === "add"
                  ? "Add a new student record"
                  : "Edit the student's details"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-6 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 focus:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      {...field}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 focus:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Student ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="11-digit ID"
                      {...field}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 focus:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="programCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Program Code</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 w-full bg-blue-50 focus:bg-white">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CS">CS</SelectItem>
                      <SelectItem value="DSI">DSI</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-800">Academic Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY-YYYY"
                      {...field}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 focus:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="pt-4 flex flex-row items-center justify-end space-x-2">
              <Button
                type="submit"
                size={"icon"}
                className="bg-green-50 hover:bg-green-100 text-green-600 p-0 h-12 w-12 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 border border-green-100 hover:border-green-200"
              >
                {mode === "add" ? (
                  <PlusCircle className="h-5 w-5 stroke-2" />
                ) : (
                  <Check className="h-5 w-5 stroke-2" />
                )}
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                size={"icon"}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-0 h-12 w-12 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 border border-blue-100 hover:border-blue-200"
              >
                <RotateCcw className="h-5 w-5 stroke-2" />
              </Button>

              {mode === "edit" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-0 h-12 w-12 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 border border-red-100 hover:border-red-200"
                    >
                      <Trash2 className="h-5 w-5 stroke-2" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the student's data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-700 hover:bg-red-800"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailSheet;
