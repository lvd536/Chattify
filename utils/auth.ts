import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { UserCredential } from "firebase/auth";

export const ensureUserInFirestore = async (firebaseUser: UserCredential) => {
    if (!firebaseUser) return;

    const userRef = doc(db, "users", firebaseUser.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        const user = {
            uid: firebaseUser.user.uid,
            email: firebaseUser.user.email ?? null,
            displayName: firebaseUser.user.displayName ?? "",
            photoURL: firebaseUser.user.photoURL ?? "",
            createdAt: serverTimestamp() as Timestamp,
            lastSeen: serverTimestamp() as Timestamp,
            description: "",
            username:
                firebaseUser.user.displayName
                    ?.toLowerCase()
                    .replace(/\s+/g, "") || "",
        };
        await setDoc(userRef, user);
    }
};

export const updateUserActiveStatus = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    try {
        await setDoc(
            userRef,
            {
                lastSeen: serverTimestamp(),
            },
            { merge: true }
        );
    } catch (error) {
        console.error("Error updating user active status:", error);
    }
};
