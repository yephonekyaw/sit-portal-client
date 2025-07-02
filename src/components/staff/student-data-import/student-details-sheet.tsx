import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import type {
  StudentDetailsSheetProps,
  FileParsedTableRowStudentRecord,
} from "@/types/staff/student-data-import/index.types";
import { EDITABLE_FIELDS } from "@/constants/staff/student-data-import/index.constants";

export const StudentDetailsSheet: React.FC<StudentDetailsSheetProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedStudent, setEditedStudent] =
    useState<FileParsedTableRowStudentRecord | null>(student);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedStudent(student);
    setHasChanges(false);
  }, [student]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editedStudent) return;

      const { id, value } = e.target;
      setEditedStudent((prev) => (prev ? { ...prev, [id]: value } : null));
      setHasChanges(true);
    },
    [editedStudent]
  );

  const handleSave = useCallback(() => {
    if (editedStudent && hasChanges) {
      onSave(editedStudent);
    }
    onClose();
  }, [editedStudent, hasChanges, onSave, onClose]);

  const handleClose = useCallback(() => {
    setHasChanges(false);
    onClose();
  }, [onClose]);

  if (!student) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-[500px] bg-gradient-to-b from-white to-blue-50/30 border-blue-200">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Edit Student Details
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Make changes to the student's information here. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {EDITABLE_FIELDS.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label
                htmlFor={field.id}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </Label>
              <Input
                id={field.id}
                type={field.type}
                value={editedStudent?.[field.id] || ""}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm"
              />
            </div>
          ))}
        </div>

        <SheetFooter className="pt-6 border-t border-blue-100">
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
