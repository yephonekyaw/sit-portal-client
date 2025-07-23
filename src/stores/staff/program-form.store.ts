import type { Program } from "@/mock/programs.mock";
import { programs } from "@/mock/programs.mock";
import { create } from "zustand";

interface ProgramFormState {
  currentProgram: Program | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentProgram: (program: Program | null) => void;
  clearCurrentProgram: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadProgram: (programId: string) => Promise<void>;
  saveProgram: (programData: Omit<Program, 'id' | 'created_at' | 'updated_at' | 'student_count' | 'requirement_count'> & { id?: string }) => Promise<void>;
}

export const useProgramFormStore = create<ProgramFormState>((set, get) => ({
  currentProgram: null,
  isLoading: false,
  error: null,

  setCurrentProgram: (program) => set({ currentProgram: program }),
  
  clearCurrentProgram: () => set({ 
    currentProgram: null, 
    error: null 
  }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  loadProgram: async (programId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const program = programs.find(p => p.id === programId);
      if (!program) {
        throw new Error("Program not found");
      }
      
      set({ 
        currentProgram: program,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to load program",
        isLoading: false 
      });
    }
  },

  saveProgram: async (programData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date().toISOString();
      
      if (programData.id) {
        // Update existing program
        const updatedProgram: Program = {
          ...programData,
          id: programData.id,
          created_at: get().currentProgram?.created_at || now,
          updated_at: now,
          student_count: get().currentProgram?.student_count || 0,
          requirement_count: get().currentProgram?.requirement_count || 0,
        };
        
        console.log("Updated program:", updatedProgram);
        set({ 
          currentProgram: updatedProgram,
          isLoading: false 
        });
      } else {
        // Create new program
        const newProgram: Program = {
          ...programData,
          id: `550e8400-e29b-41d4-a716-${Date.now()}`,
          created_at: now,
          updated_at: now,
          student_count: 0,
          requirement_count: 0,
        };
        
        console.log("Created program:", newProgram);
        set({ 
          currentProgram: newProgram,
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to save program",
        isLoading: false 
      });
      throw error;
    }
  },
}));