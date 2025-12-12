"use client";
import { useState } from "react";
import { auth } from "@/utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState<string>("");
    const handleSubmit = () => {
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email sent!");
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-email") {
                        alert(
                            "Неверный email. Пожалуйста, попробуйте еще раз."
                        );
                    } else {
                        alert(
                            "Error sending password reset email: " +
                                error.message
                        );
                    }
                });
            return;
        }
        alert(
            "Please enter your email address to receive a password reset link."
        );
    };
    return (
        <div className="flex flex-col w-125 h-150 mx-auto gap-5 rounded-sm items-center justify-center">
            <label htmlFor="emailInput" className="text-auth-text font-medium">
                Enter your email
            </label>
            <input
                type="email"
                name="emailInput"
                id="emailInput"
                placeholder="Введите ваш email"
                className="flex w-90 h-7 rounded-sm text-text focus:outline-none focus:ring-2 focus:ring-auth-input border-none bg-auth-input-bg placeholder:text-auth-text p-5 transition-ring duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                type="button"
                className="flex w-90 items-center justify-center overflow-hidden rounded-sm h-10 px-5 bg-auth-input text-text font-bold hover:bg-auth-input-hover transition-colors duration-200 disabled:bg-auth-input/50"
                onClick={handleSubmit}
                disabled={!email}
            >
                Send reset link
            </button>
            <Link
                href={"/auth/login"}
                className="text-sm w-90 flex items-center justify-center text-text hover:text-auth-input transition-text duration-300"
            >
                Back to login
            </Link>
        </div>
    );
}
