import { useState, useCallback } from "react";
import type {
  FileParsedTableRowStudentRecord,
  ParsedFileStudentRecordSchemaType,
  UseParsedRecordManagerProps,
} from "@/types/staff/student-data-import/types";

export const useParsedRecordManager = ({
  parsedData,
  setParsedData,
}: UseParsedRecordManagerProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<FileParsedTableRowStudentRecord | null>(null);

  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
    setSelectedRecord(null);
  }, []);

  const handleOpenSheet = useCallback(() => {
    setIsSheetOpen(true);
  }, []);

  const handleSelectRecord = useCallback(
    (record: FileParsedTableRowStudentRecord) => {
      setSelectedRecord(record);
      setIsSheetOpen(true);
    },
    []
  );

  const handleUpdateRecord = useCallback(
    (updatedRecord: FileParsedTableRowStudentRecord) => {
      setParsedData(
        parsedData.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );
      handleCloseSheet();
    },
    [parsedData, setParsedData, handleCloseSheet]
  );

  const handleDeleteRecord = useCallback(
    (recordId: string) => {
      setParsedData(parsedData.filter((record) => record.id !== recordId));
      handleCloseSheet();
    },
    [parsedData, setParsedData, handleCloseSheet]
  );

  const handleAddRecord = useCallback(
    (newRecord: ParsedFileStudentRecordSchemaType) => {
      const recordWithId: FileParsedTableRowStudentRecord = {
        ...newRecord,
        id: (parsedData.length + 1).toString(),
        sourceFile: "Manual Entry",
      };
      setParsedData([...parsedData, recordWithId]);
      handleCloseSheet();
    },
    [parsedData, setParsedData, handleCloseSheet]
  );

  return {
    isSheetOpen,
    selectedRecord,
    handleSelectRecord,
    handleCloseSheet,
    handleUpdateRecord,
    handleDeleteRecord,
    handleAddRecord,
    handleOpenSheet,
  };
};
