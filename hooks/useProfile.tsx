import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/utils/firebase";
import IProfileEditData from "@/types/IProfileEditData";

export function useProfile(uid: string) {
    const q = query(collection(db, "users"), where("uid", "==", uid));

    const [user, loading, error] = useCollectionData(q);

    return { user, loading, error };
}

export async function getProfile(uid: string) {
    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists || !userDoc.data) {
            throw new Error("User not found");
        }
        const data = userDoc.data();
        const plainObject = {
            id: userDoc.id,
            ...data,
            createdAt: data?.createdAt.toDate().toISOString(),
            lastSeen: data?.lastSeen.toDate().toISOString(),
        };
        return plainObject;
    } catch (error) {
        console.error("Error fetching user profile: ", error);
    }
}

export async function setProfile(uid: string, data: Partial<IProfileEditData>) {
    const userRef = doc(db, "users", uid);

    const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", data.username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    const userDoc = await getDoc(userRef);
    const currentUsername = userDoc.data()?.username;

    if (!usernameSnapshot.empty && currentUsername !== data.username) {
        alert("Username is already taken");
        throw new Error("Username is already taken");
    }

    try {
        await updateDoc(userRef, data);
    } catch (error) {
        console.error("Error updating user profile: ", error);
        throw error;
    }
}
