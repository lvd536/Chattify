"use client";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export default function TestDetails() {
    const [user, loading] = useAuthState(auth);
    return (
        <>
            {loading ? (
                <div>loading...</div>
            ) : (
                <div>
                    <p>Name: {user?.displayName}</p>
                    <p>Email: {user?.email}</p>
                    <p>Verified: {user?.emailVerified ? "true" : "false"}</p>
                    <p>Id: {user?.uid}</p>
                </div>
            )}
        </>
    );
}