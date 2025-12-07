import { Timestamp } from "firebase/firestore";

export interface IUser {
    uid: string;
    username?: string;
    displayName?: string;
    email: string | null;
    photoURL?: string | null;
    description?: string | null;
    createdAt: Timestamp;
    lastSeenAt?: Timestamp;
}
