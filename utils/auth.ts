import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { UserCredential } from "firebase/auth";

export const ensureUserInFirestore = async (firebaseUser: UserCredential) => {
    if (!firebaseUser) return;

    const userRef = doc(db, "users", firebaseUser.user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            uid: firebaseUser.user.uid,
            email: firebaseUser.user.email ?? null,
            displayName: firebaseUser.user.displayName ?? "",
            photoURL: firebaseUser.user.photoURL ?? "",
            createdAt: serverTimestamp(),
            description: "",
            username:
                firebaseUser.user.displayName
                    ?.toLowerCase()
                    .replace(/\s+/g, "") || "",
        });
    }
};
