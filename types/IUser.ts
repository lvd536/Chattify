import { Timestamp } from "firebase/firestore";

export interface IUser {
    uid: string;
    username?: string;
    displayName?: string;
    email: string | null;
    photoUrl?: string | null;
    bio?: string | null;
    createdAt: Timestamp;
    lastSeenAt?: Timestamp;
}
