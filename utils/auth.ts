import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { UserCredential } from "firebase/auth";
import { userStore } from "@/stores/userStore";

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
            createdAt: serverTimestamp(),
            lastSeen: serverTimestamp(),
            description: "",
            username:
                firebaseUser.user.displayName
                    ?.toLowerCase()
                    .replace(/\s+/g, "") || "",
        };
        await setDoc(userRef, user);
        userStore.getState().setUser(user);
    }
};
