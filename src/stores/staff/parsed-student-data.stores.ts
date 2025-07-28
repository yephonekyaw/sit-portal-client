import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  FileParsedTableRowStudentRecord,
  ParsedStudentDataState,
  FileParseResult,
} from "@/types/staff/data-import.types";
import {
  validateAndFormatStudentData,
  parseCSV,
  parseExcel,
  validateColumns,
  removeDuplicates,
} from "@/utils/staff/data-import.utils";
import { toast } from "sonner";

export const useParsedStudentDataStore = create<ParsedStudentDataState>()(
  devtools(
    (set, get) => ({
      // Initial State
      parsedData: [],
      filesWithErrors: [],
      fileParseResults: {},
      isLoading: false,
      isSheetOpen: false,
      selectedRecord: null,
      mode: "edit",

      // File Parser Actions
      parseFiles: async (files: File[]) => {
        if (files.length === 0) {
          const manualEntryData = get().parsedData.filter(
            (record) => record.sourceFile === "Manual Entry"
          );

          // If no files are selected, we only keep manual entry data
          set({
            parsedData: manualEntryData,
            filesWithErrors: [],
            fileParseResults: {},
          });

          // Even if no files are selected, we still need to reorder records coming thru manual entry
          // This ensures that the IDs are sequential after any additions or deletions
          get().handleReorderRecords();
          return;
        }

        set({ isLoading: true });
        const manualEntryData = get().parsedData.filter(
          (record) => record.sourceFile === "Manual Entry"
        );
        const allData: FileParsedTableRowStudentRecord[] = [...manualEntryData];
        const errors: string[] = [];
        const parseResults: Record<string, FileParseResult> = {};
        let rowCount = allData.length + 1;

        try {
          for (const file of files) {
            try {
              let rawData: any[] = [];
              let parseErrors: string[] = [];

              if (file.name.endsWith(".csv")) {
                const result = await parseCSV(file);
                rawData = result.data;
                parseErrors = result.errors;
              } else if (
                file.name.endsWith(".xls") ||
                file.name.endsWith(".xlsx")
              ) {
                const result = await parseExcel(file);
                rawData = result.data;
                parseErrors = result.errors;
              }

              // Check if file has required columns
              if (!validateColumns(rawData)) {
                const result: FileParseResult = {
                  success: false,
                  errors: [
                    {
                      field: "File Structure",
                      message:
                        "Missing required columns. Please check that your file contains all required columns.",
                      value: Object.keys(rawData[0] || {}),
                    },
                  ],
                  fileName: file.name,
                };
                parseResults[file.name] = result;
                errors.push(file.name);
                continue;
              }

              // Validate and format the data
              const validationResult = validateAndFormatStudentData(
                rawData,
                file.name,
                rowCount
              );

              parseResults[file.name] = validationResult;

              if (validationResult.success && validationResult.data) {
                allData.push(...validationResult.data);
                rowCount += validationResult.data.length;
              } else {
                errors.push(file.name);
                // Show detailed error toast
                const errorCount = validationResult.errors?.length || 0;
                toast.error(
                  `File ${file.name} has ${errorCount} validation error(s)`,
                  {
                    description: `${errorCount} rows failed validation. Check the file preview for details.`,
                  }
                );
              }

              // Show parse errors if any
              if (parseErrors.length > 0) {
                toast.error(`Parse errors in ${file.name}`, {
                  description: parseErrors.join("; "),
                });
              }
            } catch (error) {
              const result: FileParseResult = {
                success: false,
                errors: [
                  {
                    field: "File Processing",
                    message:
                      error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
                    value: file.name,
                  },
                ],
                fileName: file.name,
              };
              parseResults[file.name] = result;
              toast.error(`Error parsing file ${file.name}`, {
                description:
                  error instanceof Error ? error.message : String(error),
              });
              errors.push(file.name);
            }
          }
        } finally {
          set({ isLoading: false });
        }

        // Remove duplicates from all data
        const deduplicatedData = removeDuplicates(allData);
        const duplicatesRemoved = allData.length - deduplicatedData.length;

        if (duplicatesRemoved > 0) {
          toast.info(`${duplicatesRemoved} duplicate record(s) removed`, {
            description: "Duplicates were identified by Student ID and Email",
          });
        }

        set({
          parsedData: deduplicatedData,
          filesWithErrors: errors,
          fileParseResults: parseResults,
        });

        // Reorder records after parsing
        // This ensures that the IDs are sequential after any additions or deletions
        get().handleReorderRecords();
      },

      setParsedData: (data) => set({ parsedData: data }),

      clearData: () =>
        set({
          parsedData: [],
          filesWithErrors: [],
          fileParseResults: {},
          isSheetOpen: false,
          selectedRecord: null,
          mode: "edit",
        }),

      // Record Manager Actions
      handleOpenSheet: () => set({ isSheetOpen: true }),

      handleCloseSheet: () =>
        set({
          isSheetOpen: false,
          selectedRecord: null,
        }),

      handleSelectRecord: (record, mode) =>
        set({
          selectedRecord: record,
          isSheetOpen: true,
          mode,
        }),

      handleUpdateRecord: (updatedRecord) => {
        const { parsedData } = get();
        const updatedData = parsedData.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        );
        set({
          parsedData: updatedData,
          isSheetOpen: false,
          selectedRecord: null,
        });
      },

      handleDeleteRecord: (recordId) => {
        const { parsedData } = get();
        const filteredData = parsedData.filter(
          (record) => record.id !== recordId
        );
        set({
          parsedData: filteredData,
          isSheetOpen: false,
          selectedRecord: null,
        });
      },

      handleMultipleDelete: (recordIds) => {
        const { parsedData } = get();
        const filteredData = parsedData.filter(
          (record) => !recordIds.includes(record.id)
        );
        set({
          parsedData: filteredData,
          isSheetOpen: false,
          selectedRecord: null,
        });
      },

      handleAddRecord: (newRecord) => {
        const { parsedData } = get();
        const recordWithId: FileParsedTableRowStudentRecord = {
          ...newRecord,
          id: (parsedData.length + 1).toString(),
          sourceFile: "Manual Entry",
        };
        set({
          parsedData: [...parsedData, recordWithId],
          isSheetOpen: false,
          selectedRecord: null,
        });
      },

      handleReorderRecords: () => {
        const { parsedData } = get();
        const rearrangedData = parsedData.map((record, index) => ({
          ...record,
          id: (index + 1).toString(),
        }));
        set({ parsedData: rearrangedData });
      },

      // Direct setters for more granular control
      setMode: (mode) => set({ mode }),
      setSelectedRecord: (record) => set({ selectedRecord: record }),
      setIsSheetOpen: (isOpen) => set({ isSheetOpen: isOpen }),
    }),
    {
      name: "student-data-store",
    }
  )
);

export const useParsedStudentData = () =>
  useParsedStudentDataStore((state) => state.parsedData);
export const useParsedStudentDataActions = () =>
  useParsedStudentDataStore((state) => ({
    parseFiles: state.parseFiles,
    setParsedData: state.setParsedData,
    clearData: state.clearData,
    handleOpenSheet: state.handleOpenSheet,
    handleCloseSheet: state.handleCloseSheet,
    handleSelectRecord: state.handleSelectRecord,
    handleUpdateRecord: state.handleUpdateRecord,
    handleDeleteRecord: state.handleDeleteRecord,
    handleMultipleDelete: state.handleMultipleDelete,
    handleAddRecord: state.handleAddRecord,
    handleReorderRecords: state.handleReorderRecords,
  }));
export const useSheetState = () =>
  useParsedStudentDataStore((state) => ({
    isSheetOpen: state.isSheetOpen,
    selectedRecord: state.selectedRecord,
    mode: state.mode,
  }));
export const useFileParserState = () =>
  useParsedStudentDataStore((state) => ({
    parsedData: state.parsedData,
    filesWithErrors: state.filesWithErrors,
    fileParseResults: state.fileParseResults,
    isLoading: state.isLoading,
  }));
