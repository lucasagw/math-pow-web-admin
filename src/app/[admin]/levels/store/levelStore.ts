import { revalidatePath } from "next/cache";
import { create } from "zustand";
// Repositories
import levelRepo from "../repositories/levelRepo";
// DTOS
import { CreateLevelDTO } from "../dtos/levelDto";
// Types
import { ILevel } from "@/app/common/types";

interface LevelState {
  isLoading: boolean;
  levels: ILevel[];
  fetchAll: () => void;
  findByTitleOrDescription: (key: string) => void;
  storeLevel: (createLevelDto: CreateLevelDTO) => void;
  deleteLevel: (uid: string) => void;
}

export const useLevelStore = create<LevelState>()((_set) => ({
  isLoading: false,
  levels: [],
  findByTitleOrDescription: async (key) => {
    _set({ isLoading: true });
    try {
      const levels = await levelRepo.getLevelsByTitleOrDescription(key);
      _set(() => ({ levels }));
    } catch (error) {
      console.error("Error when we tried to search", error);
    } finally {
      _set({ isLoading: false });
      revalidatePath("/levels");
    }
  },
  storeLevel: async (createLevelDto: CreateLevelDTO) => {
    _set({ isLoading: true });
    try {
      await levelRepo.createLevel(createLevelDto);
    } catch (error) {
      console.error("Error when we tried to store level", error);
    } finally {
      _set({ isLoading: false });
      revalidatePath("/levels");
    }
  },
  deleteLevel: async (uid: string) => {
    _set({ isLoading: true });
    try {
      await levelRepo.deleteLevel(uid);
    } catch (error) {
      console.error("Error when we tried to store level", error);
    } finally {
      _set({ isLoading: false });
    }
  },
  fetchAll: async () => {
    _set({ isLoading: true });
    try {
      const levels = await levelRepo.getLevels();
      _set(() => ({ levels }));
    } catch (error) {
      console.error("Error when we tried to fetch all levels", error);
    } finally {
      _set({ isLoading: false });
      revalidatePath("/levels");
    }
  },
}));
