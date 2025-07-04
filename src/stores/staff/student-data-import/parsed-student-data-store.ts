import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  FileParsedTableRowStudentRecord,
  ParsedStudentDataState,
} from "@/types/staff/student-data-import/types";
import {
  formatParsedStudentData,
  parseCSV,
  parseExcel,
  validateColumns,
} from "@/utils/staff/student-data-import/utils";

export const useParsedStudentDataStore = create<ParsedStudentDataState>()(
  devtools(
    (set, get) => ({
      // Initial State
      parsedData: [],
      filesWithErrors: [],
      isLoading: false,
      isSheetOpen: false,
      selectedRecord: null,
      mode: "edit",

      // File Parser Actions
      parseFiles: async (files: File[]) => {
        if (files.length === 0) {
          set({ parsedData: [], filesWithErrors: [] });
          return;
        }

        set({ isLoading: true });
        const allData: FileParsedTableRowStudentRecord[] = [];
        const errors: string[] = [];
        let rowCount = 1;

        try {
          for (const file of files) {
            try {
              let jsonData: FileParsedTableRowStudentRecord[] = [];

              if (file.name.endsWith(".csv")) {
                jsonData = await parseCSV(file);
              } else if (
                file.name.endsWith(".xls") ||
                file.name.endsWith(".xlsx")
              ) {
                jsonData = await parseExcel(file);
              }

              if (validateColumns(jsonData)) {
                const formattedData = formatParsedStudentData(
                  jsonData,
                  file.name,
                  rowCount
                );
                allData.push(...formattedData);
                rowCount += formattedData.length;
              } else {
                errors.push(file.name);
              }
            } catch (error) {
              console.error(`Error parsing file ${file.name}:`, error);
              errors.push(file.name);
            }
          }
        } finally {
          set({ isLoading: false });
        }

        set({ parsedData: allData, filesWithErrors: errors });
      },

      setParsedData: (data) => set({ parsedData: data }),

      clearData: () =>
        set({
          parsedData: [],
          filesWithErrors: [],
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
    handleAddRecord: state.handleAddRecord,
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
    isLoading: state.isLoading,
  }));
