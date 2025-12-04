import { FieldValue } from "firebase/firestore";

export interface IChat {
    id: string;
    participants: string[];
    lastMessageText?: string | null;
    lastMessageAt?: FieldValue | null;
    createdAt: FieldValue;
}
