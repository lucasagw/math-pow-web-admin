import { create } from "zustand";
import { toast } from "react-toastify";
// Types
import { IQuestion } from "@/app/common/types";
// Schemas
import { questionData } from "../schemas";
// Repositories
import questionRepo from "../repositories/questionRepo";

interface QuestionState {
  questions: IQuestion[];
  isLoadingQuestions: boolean;
  isCreatingQuestion: boolean;
  isDeletingQuestion: boolean;
  isUpdatingQuestion: boolean;
}

interface QuestionActions {
  createQuestion: (data: questionData) => Promise<void>;
  getAllQuestions: () => Promise<void>;
  updateQuestionByUid: (
    uid: string,
    data: Partial<questionData>
  ) => Promise<void>;
  deleteQuestionByUid: (uid: string) => Promise<void>;
}

const useQuestionStore = create<QuestionState & QuestionActions>()((set) => ({
  questions: [],
  isLoadingQuestions: false,
  isCreatingQuestion: false,
  isDeletingQuestion: false,
  isUpdatingQuestion: false,
  createQuestion: async (data: questionData) => {
    set({ isCreatingQuestion: true });
    try {
      await questionRepo.createQuestion(data);
      toast.success("Questão cadastrada com sucesso!");
    } catch (error) {
      console.error("Error when we tried to create question", error);
      toast.error("Ocorreu um erro ao tentar cadastrar a questão!");
    } finally {
      set({ isCreatingQuestion: false });
    }
  },
  getAllQuestions: async () => {
    set({ isLoadingQuestions: true });
    try {
      const questions = await questionRepo.getQuestions();
      set({ questions });
    } catch (error) {
      console.error("Error when we tried to get questions", error);
      toast.error("Ocorreu um erro ao tentar obter as questões!");
    } finally {
      set({ isLoadingQuestions: false });
    }
  },
  deleteQuestionByUid: async (uid: string) => {
    set({ isDeletingQuestion: true });
    try {
      await questionRepo.deleteQuestion(uid);
      toast.success("Questão deletada com sucesso!");
    } catch (error) {
      console.error("Error when we tried to delete question", error);
      toast.error("Ocorreu um erro ao tentar deletar a questão!");
    } finally {
      set({ isDeletingQuestion: false });
    }
  },
  updateQuestionByUid: async (uid: string, data: Partial<questionData>) => {
    set({ isUpdatingQuestion: true });
    try {
      await questionRepo.updateQuestion(uid, data);
      toast.success("Questão atualizada com sucesso!");
    } catch (error) {
      console.error("Error when we tried to update question", error);
      toast.error("Ocorreu um erro ao tentar atualizar a questão!");
    } finally {
      set({ isUpdatingQuestion: false });
    }
  },
}));

export default useQuestionStore;
