import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Types
import { IAnswer } from "@/app/common/types";
// Services
import { storageService } from "@/app/common/services";
// Schemas
import { toast } from "react-toastify";
import { AnswerData } from "../schema";
// Repositories
import answerRepo from "../repositories/answerRepo";
//DTOS
import { CreateAnswerDTO } from "../dtos/answerDto";

interface AnswerState {
  isLoading: boolean;
  isLoadingNewAnswer: boolean;
  isDeletingAnswer: boolean;
  answers: IAnswer[];
  fetchAll: () => Promise<void>;
  findByAnswerOrDescription: (key: string) => Promise<void>;
  storeAnswer: (createAnswerDto: AnswerData) => Promise<void>;
  deleteAnswer: (uid: string) => Promise<void>;
}

export const useAnswerStore = create<AnswerState>()((_set) => ({
  isLoadingNewAnswer: false,
  isLoading: true,
  isDeletingAnswer: false,
  answers: [],

  fetchAll: async () => {
    _set({ isLoading: true });
    try {
      const answers = await answerRepo.getAnswers();
      _set(() => ({ answers }));
    } catch (error) {
      console.error("Error when we tried to fetch all answers", error);
    } finally {
      _set({ isLoading: false });
    }
  },

  findByAnswerOrDescription: async (key) => {
    _set({ isLoading: true });
    try {
      const answers = await answerRepo.getAnswersByStatementOrDescription(key);
      _set(() => ({ answers }));
    } catch (error) {
      console.error("Error when we tried to search answers", error);
    } finally {
      _set({ isLoading: false });
    }
  },

  storeAnswer: async (createAnswerData: AnswerData) => {
    _set({ isLoadingNewAnswer: true });
    try {
      const file = createAnswerData.imageUrl as File;
      const remoteUrl = await storageService.uploadFile(
        file,
        `/answers/${file.name}${uuidv4()}`
      );
      const result: CreateAnswerDTO = {
        ...createAnswerData,
        imageUrl: remoteUrl,
      };
      await answerRepo.createAnswer(result as CreateAnswerDTO);
      toast.success("Resposta cadastrada!");
    } catch (error) {
      console.error("Error when we tried to store answer", error);
      toast.error("Ocorreu um erro ao cadastrar a resposta");
    } finally {
      _set({ isLoadingNewAnswer: false });
    }
  },

  deleteAnswer: async (uid: string) => {
    _set({ isDeletingAnswer: true });
    try {
      await answerRepo.deleteAnswer(uid);
      toast.success("Resposta deletada!");
    } catch (error) {
      console.error("Error when we tried to remove answer", error);
    } finally {
      _set({ isDeletingAnswer: false });
    }
  },
}));
