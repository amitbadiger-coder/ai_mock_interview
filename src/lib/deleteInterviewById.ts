import { db } from "@/config/Firebase.config.ts";
import { doc, deleteDoc } from "firebase/firestore";

/**
 * Deletes an interview document by ID from Firestore
 * @param id - Firestore document ID of the interview
 */
export const deleteInterviewById = async (id: string): Promise<void> => {
  if (!id) throw new Error("Interview ID is required");

  const interviewRef = doc(db, "interviews", id);
  await deleteDoc(interviewRef);
};
