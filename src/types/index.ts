import type { FieldValue, Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    createdAt: Timestamp | FieldValue;
    updateAt: Timestamp | FieldValue;

}

export interface Interview{
    id:string;
    position:string;
    description:string;
    experience:number;
    userId:string;
    techStack:string;
    questions:{question:string ; answer:string}[];
    attempted?: boolean;
    createdAt:Timestamp;
    updateAt:Timestamp;

}

export interface UserAnswers{
    id:string;
    mockIdRef:string;
    question:string;
    correct_ans:string;
    user_ans:string;
    feedback:string;
    rating:string;
    userId:string;
    createdAt:Timestamp
    updatedAt:Timestamp
}