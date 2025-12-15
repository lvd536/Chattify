import { Timestamp } from "firebase/firestore";

export interface IGroup {
    name: string;
    description: string;
    members: string[];
    admins: string[];
    photoURL: string;
    lastMessageAt: string;
    lastMessageText: string;
    createdAt: Timestamp;
}
