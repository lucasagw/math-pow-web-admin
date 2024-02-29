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
import { toast } from "react-toastify";

interface LevelState {
  isLoading: boolean;
  isLoadingNewLevel: boolean;
  isDeletingLevel: boolean;
  levels: ILevel[];
  fetchAll: () => Promise<void>;
  findByTitleOrDescription: (key: string) => Promise<void>;
  storeLevel: (createLevelDto: createLevelData) => Promise<void>;
  deleteLevel: (uid: string) => Promise<void>;
}

export const useLevelStore = create<LevelState>()((_set) => ({
  isLoadingNewLevel: false,
  isLoading: false,
  isDeletingLevel: false,
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
    _set({ isLoadingNewLevel: true });
    try {
      const file = createLevelData.imageUrl as File;
      const remoteUrl = await storageService.uploadFile(
        file,
        `/levels/${file.name}${uuidv4()}`
      );
      const result: CreateLevelDTO = {
        ...createLevelData,
        imageUrl: remoteUrl,
      };
      await levelRepo.createLevel(result as CreateLevelDTO);
      toast.success("Ranking cadastrado com sucesso!");
    } catch (error) {
      console.error("Error when we tried to store level", error);
      toast.error("Ocorreu um erro ao cadastrar o rank");
    } finally {
      _set({ isLoadingNewLevel: false });
    }
  },
  deleteLevel: async (uid: string) => {
    _set({ isDeletingLevel: true });
    try {
      await levelRepo.deleteLevel(uid);
      toast.success("Ranking deletado com sucesso!");
    } catch (error) {
      console.error("Error when we tried to store level", error);
    } finally {
      _set({ isDeletingLevel: false });
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
