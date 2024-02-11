// lib/FirebaseStorageHandler.ts
import { app } from "@/app/config/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  FirebaseStorage,
  UploadResult,
} from "firebase/storage";

class FirebaseStorageHandler {
  private storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage(app);
  }

  public uploadFile = async (
    localFilePath: Blob | Uint8Array | ArrayBuffer,
    remotePath: string
  ): Promise<string> => {
    try {
      const storageRef = ref(this.storage, remotePath);
      await uploadBytes(storageRef, localFilePath);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  public downloadFile = async (
    remotePath: string,
    localFilePath: string
  ): Promise<void> => {
    try {
      const storageRef = ref(this.storage, remotePath);
      // Implement download logic based on your requirements
      // You might need to use functions like getDownloadURL and fetch
    } catch (error) {
      console.error("Error downloading file:", error);
      throw error;
    }
  };

  public handleRemotePath = async (text: string): Promise<string> => {
    return text + "/" + new Date();
  };

  public deleteFile = async (remotePath: string): Promise<void> => {
    try {
      const storageRef = ref(this.storage, remotePath);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  };

  public getDownloadUrl = async (remotePath: string): Promise<string> => {
    try {
      const storageRef = ref(this.storage, remotePath);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error when we tried to get download url", error);
      throw error;
    }
  };
}

const storageService = new FirebaseStorageHandler();

export default storageService;
