//Firebase
import {
  doc,
  setDoc,
  collection,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  or,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

//DTOS
import { CreateAnswerDTO, UpdateAnswerDto } from "../dtos/answerDto";

//Types
import { IAnswer } from "@/app/common/types";

//Collection Reference
const answerCollectionRef = collection(db, "answers");

class AnswerRepo {
  constructor() {}

  private getDocRef(uid?: string) {
    if (uid) return doc(answerCollectionRef, uid);
    return doc(answerCollectionRef);
  }

  async createAnswer(answerDto: CreateAnswerDTO) {
    try {
      const newAnswerRef = this.getDocRef();
      await setDoc(newAnswerRef, { ...answerDto, uid: newAnswerRef.id });
    } catch (error) {
      console.error("Error when we tried to create answer", error);
    }
  }

  async getAnswersByStatementOrDescription(key: string) {
    try {
      const result = query(
        answerCollectionRef,
        or(
          where("statement", "array-contains", key),
          where("description", "array-contains", key)
        )
      );

      const querySnapshot = await getDocs(result);
      if (querySnapshot.empty) return [];
      const answers: IAnswer[] = [];
      querySnapshot.forEach((doc) => answers.push(doc.data() as IAnswer));
      return answers;
    } catch (error) {
      console.error("Error when we tried to search answers", error);
    }
  }

  async getAnswers() {
    try {
      const answersSnapshot = await getDocs(answerCollectionRef);
      if (answersSnapshot.empty) return [] as IAnswer[];
      const answers: IAnswer[] = [];
      answersSnapshot.forEach((doc) => {
        answers.push(doc.data() as IAnswer);
      });
      return answers;
    } catch (error) {
      console.error("Error when we tried to getAnswers", error);
    }
  }

  async updateAnswer(uid: string, updateAnswerDto: UpdateAnswerDto) {
    try {
      const answerRef = this.getDocRef(uid);
      await setDoc(answerRef, updateAnswerDto);
    } catch (error) {
      console.error("Error when we tried to update answer", error);
    }
  }

  async deleteAnswer(uid: string) {
    try {
      const answerRef = this.getDocRef(uid);
      await deleteDoc(answerRef);
    } catch (error) {
      console.error("Error when we tried to delete answer", error);
    }
  }
}

const answerRepo = new AnswerRepo();

export default answerRepo;
