import type { ProgramRequirement } from "@/mock/prog-reqs.mock";
import { programRequirements } from "@/mock/prog-reqs.mock";
import type { ProgramRequirementFormSchemaType } from "@/types/staff/prog-reqs.types";
import { create } from "zustand";

interface ProgramRequirementFormState {
  currentRequirement: ProgramRequirement | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentRequirement: (requirement: ProgramRequirement | null) => void;
  clearCurrentRequirement: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadRequirement: (requirementId: string) => Promise<void>;
  saveRequirement: (
    requirementData: ProgramRequirementFormSchemaType & {
      program: { program_code: string };
      certificate_type: { code: string; name: string };
      id?: string;
    }
  ) => Promise<void>;
}

export const useProgramRequirementFormStore =
  create<ProgramRequirementFormState>((set, get) => ({
    currentRequirement: null,
    isLoading: false,
    error: null,

    setCurrentRequirement: (requirement) =>
      set({ currentRequirement: requirement }),

    clearCurrentRequirement: () =>
      set({
        currentRequirement: null,
        error: null,
      }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    loadRequirement: async (requirementId: string) => {
      set({ isLoading: true, error: null });

      try {
        // Simulate API call - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const requirement = programRequirements.find(
          (r) => r.id === requirementId
        );
        if (!requirement) {
          throw new Error("Program requirement not found");
        }

        set({
          currentRequirement: requirement,
          isLoading: false,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to load program requirement",
          isLoading: false,
        });
      }
    },

    saveRequirement: async (
      requirementData: ProgramRequirementFormSchemaType & {
        program: { program_code: string };
        certificate_type: { code: string; name: string };
        id?: string;
      }
    ) => {
      set({ isLoading: true, error: null });

      try {
        // Simulate API call - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const now = new Date().toISOString();

        if (requirementData.id) {
          // Update existing requirement
          const updatedRequirement: ProgramRequirement = {
            id: requirementData.id,
            name: requirementData.name,
            program: requirementData.program,
            certificate_type: requirementData.certificate_type,
            target_year: requirementData.target_year,
            deadline_month: requirementData.deadline_month,
            deadline_day: requirementData.deadline_day,
            is_mandatory: requirementData.is_mandatory,
            special_instruction: requirementData.special_instruction ?? "",
            is_active: requirementData.is_active,
            recurrence_type: requirementData.recurrence_type,
            last_recurred_at: get().currentRequirement?.last_recurred_at || now,
            created_at: get().currentRequirement?.created_at || now,
            updated_at: now,
          };

          console.log("Updated program requirement:", updatedRequirement);
          set({
            currentRequirement: updatedRequirement,
            isLoading: false,
          });
        } else {
          // Create new requirement
          const newRequirement: ProgramRequirement = {
            id: `24d41114-de56-468e-a967-${Date.now()}`,
            name: requirementData.name,
            program: requirementData.program,
            certificate_type: requirementData.certificate_type,
            target_year: requirementData.target_year,
            deadline_month: requirementData.deadline_month,
            deadline_day: requirementData.deadline_day,
            is_mandatory: requirementData.is_mandatory,
            special_instruction: requirementData.special_instruction ?? "",
            is_active: requirementData.is_active,
            recurrence_type: requirementData.recurrence_type,
            last_recurred_at: now,
            created_at: now,
            updated_at: now,
          };

          console.log("Created program requirement:", newRequirement);
          set({
            currentRequirement: newRequirement,
            isLoading: false,
          });
        }
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to save program requirement",
          isLoading: false,
        });
        throw error;
      }
    },
  }));
