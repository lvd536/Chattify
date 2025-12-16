export interface IHasMembers {
    members: Array<{
        uid: string;
        displayName: string;
        username: string;
    }>;
}
