import { Timestamp } from "firebase/firestore";

export interface IMessage {
    id: string;
    senderId: string;
    text?: string | null;
    type?: "text" | "image" | "system";
    createdAt: Timestamp;
    deleted?: boolean;
    read?: boolean;
    duration?: number;
    chatId: string;
}
