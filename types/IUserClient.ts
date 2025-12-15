export interface IUserClient {
    uid: string;
    displayName?: string;
    username?: string;
    photoURL?: string | null;
    email?: string | null;
    createdAt: number | null;
    lastSeen: number | null;
}
