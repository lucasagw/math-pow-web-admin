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
import { CreateLevelDTO, UpdateLevelDto } from "../dtos/levelDto";
//Types
import { ILevel } from "@/app/common/types";

//Collection Reference
const levelCollectionRef = collection(db, "levels");

class LevelRepo {
  constructor() {}

  private getDocRef(uid?: string) {
    if (uid) return doc(levelCollectionRef, uid);
    return doc(levelCollectionRef);
  }

  async createLevel(levelDto: CreateLevelDTO) {
    try {
      const newLevelRef = this.getDocRef();
      await setDoc(newLevelRef, { ...levelDto, uid: newLevelRef.id });
    } catch (error) {
      console.error("Error when we tried to create level", error);
    }
  }

  async getLevelsByTitleOrDescription(key: string) {
    try {
      const result = query(
        levelCollectionRef,
        or(
          where("title", "array-contains", key),
          where("description", "array-contains", key)
        )
      );

      const querySnapshot = await getDocs(result);
      if (querySnapshot.empty) return [];
      const levels: ILevel[] = [];
      querySnapshot.forEach((doc) => levels.push(doc.data() as ILevel));
      return levels;
    } catch (error) {
      console.error("Error when we tried to getLevelsByTitle", error);
    }
  }

  async getLevels() {
    try {
      const levelsSnapshot = await getDocs(levelCollectionRef);
      if (levelsSnapshot.empty) return [] as ILevel[];
      const levels: ILevel[] = [];
      levelsSnapshot.forEach((doc) => {
        levels.push(doc.data() as ILevel);
      });
      return levels;
    } catch (error) {
      console.error("Error when we tried to getLevels", error);
    }
  }

  async updateLevel(uid: string, updateLevelDto: UpdateLevelDto) {
    try {
      const levelRef = this.getDocRef(uid);
      await setDoc(levelRef, updateLevelDto);
    } catch (error) {
      console.error("Error when we tried to update level", error);
    }
  }

  async deleteLevel(uid: string) {
    try {
      const levelRef = this.getDocRef(uid);
      await deleteDoc(levelRef);
    } catch (error) {
      console.error("Error when we tried to delete level", error);
    }
  }
}

const levelRepo = new LevelRepo();

export default levelRepo;
