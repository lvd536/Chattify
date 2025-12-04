import { FieldValue } from "firebase/firestore";

export interface IMessage {
    id: string;
    senderId: string;
    text?: string | null;
    type?: "text" | "image" | "system";
    createdAt: FieldValue;
    deleted?: boolean;
    chatId: string;
}
