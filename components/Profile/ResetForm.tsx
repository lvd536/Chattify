"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/utils/firebase";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface IResetForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ResetForm() {
    const [formData, setFormData] = useState<IResetForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const navigator = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser) {
            setError("User not found");
            return;
        } else if (!auth.currentUser.email) return;
        else if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        } else if (formData.newPassword.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            formData.currentPassword
        );
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                if (!auth.currentUser) {
                    setError("User not found");
                    return;
                }
                updatePassword(auth.currentUser, formData.newPassword)
                    .then(() => {
                        auth.signOut();
                        alert(
                            "Password reset successful. Please log in with your new password."
                        );
                        navigator.push("/");
                    })
                    .catch((err) => {
                        console.error(
                            "Error resetting password:",
                            err.code,
                            err.message
                        );
                        setError(
                            "Failed to reset password. Please try again later."
                        );
                    });
            })
            .catch(() => {
                setError("Current password is incorrect. Please try again.");
            });
        setError(null);
    };
    return (
        <form
            action=""
            className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-8"
            onSubmit={handleSubmit}
        >
            {error && (
                <h1 className="self-start text-red-500 font-semibold border-b border-b-white/30 w-full pb-3">
                    {error}
                </h1>
            )}
            <label
                htmlFor="newPassword"
                className="self-start text-text text-sm font-medium"
            >
                Current password
            </label>
            <input
                type="text"
                name="newPassword"
                id="newPassword"
                required
                className="w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300"
                value={formData.currentPassword}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                    });
                }}
            />
            <label
                htmlFor="newPassword"
                className="self-start text-text text-sm font-medium"
            >
                New password
            </label>
            <input
                type="text"
                name="newPassword"
                id="newPassword"
                required
                className="w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300"
                value={formData.newPassword}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        newPassword: e.target.value,
                    });
                }}
            />
            <label
                htmlFor="confirmPassword"
                className="self-start text-text text-sm font-medium text-nowrap"
            >
                Confirm password
            </label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300"
                value={formData.confirmPassword}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                    });
                }}
            />
            <div className="pt-6 mt-3 flex flex-col-reverse sm:flex-row gap-4 justify-end border-t border-edit-form-bg">
                <Link
                    href={"/home"}
                    className="flex items-center justify-center h-12 px-8 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="h-12 px-8 bg-primary hover:bg-blue-600/70 text-text font-bold rounded-lg shadow-lg shadow-blue-900/20 duration-300 transition-all active:scale-95"
                >
                    Reset password
                </button>
            </div>
        </form>
    );
}
