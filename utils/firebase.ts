import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getUser } from "./chat";
import { userStore } from "@/stores/userStore";

function setTokenCookie(token: string | null) {
    if (!token) {
        window.document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax;`;
        return;
    }

    const maxAge = 60 * 60;
    const secure = location.protocol === "https:" ? "; Secure" : "";
    window.document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure};`;
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const idToken = await user.getIdToken();
        const currentUser = await getUser(user.uid);
        userStore.getState().setUser(currentUser);
        setTokenCookie(idToken);
    } else {
        userStore.getState().setUser(null);
        setTokenCookie("");
    }
});
