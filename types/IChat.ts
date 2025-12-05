import { Timestamp } from "firebase/firestore";

export interface IChat {
    id: string;
    participants: string[];
    lastMessageText?: string | null;
    lastMessageAt?: Timestamp | null;
    createdAt: Timestamp;
}
