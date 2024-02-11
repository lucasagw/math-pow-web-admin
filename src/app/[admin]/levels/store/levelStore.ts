import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
// Repositories
import levelRepo from "../repositories/levelRepo";
// DTOS
import { CreateLevelDTO } from "../dtos/levelDto";
// Types
import { ILevel } from "@/app/common/types";
// Services
import { storageService } from "@/app/common/services";
// Schemas
import { createLevelData } from "../schemas";

interface LevelState {
  isLoading: boolean;
  levels: ILevel[];
  fetchAll: () => void;
  findByTitleOrDescription: (key: string) => void;
  storeLevel: (createLevelDto: createLevelData) => void;
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
    }
  },
  storeLevel: async (createLevelData: createLevelData) => {
    _set({ isLoading: true });
    try {
      const fileList = createLevelData.imageUrl as FileList;
      const remoteUrl = await storageService.uploadFile(
        fileList[0],
        `/levels/${fileList[0].name}${uuidv4()}`
      );
      const result: CreateLevelDTO = {
        ...createLevelData,
        imageUrl: remoteUrl,
      };
      await levelRepo.createLevel(result as CreateLevelDTO);
    } catch (error) {
      console.error("Error when we tried to store level", error);
    } finally {
      _set({ isLoading: false });
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
    }
  },
}));
