import { Timestamp } from "firebase/firestore";

export interface IGroup {
    id: string;
    name: string;
    description: string;
    members: string[];
    admins: string[];
    photoURL: string;
    lastMessageAt: Timestamp;
    lastMessageText: string;
    createdAt: Timestamp;
}
