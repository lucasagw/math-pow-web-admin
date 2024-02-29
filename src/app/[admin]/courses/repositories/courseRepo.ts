//Firebase
import {
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
//Types
import { ICourse } from "@/app/common/types";
import { courseData } from "../schema";

//Collection Reference
const courseCollectionRef = collection(db, "courses");

class CourseRepo {
  private getDocRef(uid?: string) {
    if (uid) return doc(courseCollectionRef, uid);
    return doc(courseCollectionRef);
  }

  async createCourse(courseDto: courseData) {
    const newCourseRef = this.getDocRef();
    return await setDoc(newCourseRef, { ...courseDto, uid: newCourseRef.id });
  }

  async getCourse(uid: string) {
    const courseRef = this.getDocRef(uid);
    const result = await getDoc(courseRef);
    if (!result.exists) return null;
    return result.data() as ICourse;
  }

  async getCourses() {
    const courseSnapshot = await getDocs(courseCollectionRef);
    if (courseSnapshot.empty) return [] as ICourse[];
    const courses: ICourse[] = [];
    courseSnapshot.forEach((doc) => {
      courses.push(doc.data() as ICourse);
    });
    return courses;
  }

  async updateCourse(uid: string, courseData: Partial<courseData>) {
    const courseRef = this.getDocRef(uid);
    return await setDoc(courseRef, courseData);
  }

  async deleteCourse(uid: string) {
    const courseRef = this.getDocRef(uid);
    return await deleteDoc(courseRef);
  }
}

const courseRepo = new CourseRepo();

export default courseRepo;
