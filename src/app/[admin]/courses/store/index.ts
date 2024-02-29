import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
// Types
import { ICourse } from "@/app/common/types";
// Services
import { storageService } from "@/app/common/services";
// Schemas
import { toast } from "react-toastify";
import { courseData } from "../schema";
// Repositories
import courseRepo from "../repositories/courseRepo";

interface CourseState {
  isLoading: boolean;
  isLoadingNewCourse: boolean;
  isDeletingCourse: boolean;
  isGettingCourses: boolean;
  courses: ICourse[];
  fetchAll: () => Promise<void>;
  storeNewCourse: (data: courseData) => Promise<void>;
  deleteCourse: (uid: string) => Promise<void>;
}

const useCourseStore = create<CourseState>()((_set) => ({
  isLoadingNewCourse: false,
  isLoading: false,
  isGettingCourses: false,
  isDeletingCourse: false,
  courses: [],
  storeNewCourse: async (data: courseData) => {
    _set({ isLoadingNewCourse: true });
    try {
      const file = data.img as unknown as File;
      const remoteUrl = await storageService.uploadFile(
        file,
        `/courses/${file.name}${uuidv4()}`
      );
      const result: courseData = {
        ...data,
        img: remoteUrl,
      };
      await courseRepo.createCourse(result as courseData);
      toast.success("Curso cadastrado com sucesso!");
    } catch (error) {
      console.error("Error when we tried to store new course", error);
      toast.error("Ocorreu um erro ao cadastrar o curso");
    } finally {
      _set({ isLoadingNewCourse: false });
    }
  },
  deleteCourse: async (uid: string) => {
    _set({ isDeletingCourse: true });
    try {
      await courseRepo.deleteCourse(uid);
      toast.success("Curso deletado com sucesso!");
    } catch (error) {
      console.error("Error when we tried to delete course ", error);
    } finally {
      _set({ isDeletingCourse: false });
    }
  },
  fetchAll: async () => {
    _set({ isGettingCourses: true });
    try {
      const courses = await courseRepo.getCourses();
      _set(() => ({ courses }));
    } catch (error) {
      console.error("Error when we tried to fetch all courses", error);
    } finally {
      _set({ isGettingCourses: false });
    }
  },
}));

export default useCourseStore;
