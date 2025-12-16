export default interface IMemberData {
    name: string;
    description: string;
    members: {
        uid: string;
        displayName: string;
        username: string;
    }[];
    photoURL: string;
}
