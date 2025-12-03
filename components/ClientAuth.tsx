// components/ClientAuth.tsx
"use client";

import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth as maybeAuth } from "@/utils/firebase";

function setTokenCookie(token: string | null) {
    if (!token) {
        document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax;`;
        return;
    }

    const maxAge = 60 * 60;
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure};`;
}

export default function ClientAuth() {
    useEffect(() => {
        if (!maybeAuth) return;

        const unsubscribe = onIdTokenChanged(maybeAuth, async (user) => {
            if (!user) {
                setTokenCookie(null);
                return;
            }

            try {
                const token = await user.getIdToken(false);
                setTokenCookie(token);
            } catch (e) {
                setTokenCookie(null);
                console.error("Failed to get ID token", e);
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
}
