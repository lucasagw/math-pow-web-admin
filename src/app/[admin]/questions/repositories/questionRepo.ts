// Firebase
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { IQuestion } from "@/app/common/types";

// Collection Reference
const questionCollectionRef = collection(db, "questions");

class QuestionRepo {
  private getDocRef(uid?: string) {
    if (uid) return doc(questionCollectionRef, uid);
    return doc(questionCollectionRef);
  }

  async createQuestion(data: IQuestion) {
    const newQuestionRef = this.getDocRef();
    return await setDoc(newQuestionRef, { ...data, uid: newQuestionRef.id });
  }

  async getQuestions() {
    const questionSnapshot = await getDocs(questionCollectionRef);
    if (questionSnapshot.empty) return [] as IQuestion[];
    const questions: IQuestion[] = [];
    questionSnapshot.forEach((doc) => {
      questions.push(doc.data() as IQuestion);
    });
    return questions;
  }

  async updateQuestion(uid: string, data: Partial<IQuestion>) {
    const questionRef = this.getDocRef(uid);
    return await setDoc(questionRef, data);
  }

  async deleteQuestion(uid: string) {
    const questionRef = this.getDocRef(uid);
    return await deleteDoc(questionRef);
  }
}

const questionRepo = new QuestionRepo();

export default questionRepo;
