"use client";
import { auth } from "@/utils/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ensureUserInFirestore } from "@/utils/auth";

interface IFormData {
    email: string;
    password: string;
}

interface IProps {
    type: "login" | "register";
}

export default function AuthForm({ type }: IProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (type === "login") {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                const user = userCredential.user;

                if (!user.emailVerified) {
                    alert(
                        "Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите email."
                    );
                    return;
                }
                await ensureUserInFirestore(userCredential);
                router.push("/home");
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (
                        error.code === "auth/invalid-credential" ||
                        error.code === "auth/user-not-found" ||
                        error.code === "auth/wrong-password"
                    ) {
                        alert(
                            "Неверный email или пароль. Пожалуйста, попробуйте еще раз."
                        );
                    } else if (error.code === "auth/user-disabled") {
                        alert("Ваш аккаунт был заблокирован администратором.");
                    } else {
                        alert(`Произошла ошибка: ${error.message}`);
                    }
                } else {
                    alert("Произошла непредвиденная ошибка.");
                }
            }
        } else {
            try {
                if (
                    !formData.email ||
                    !formData.password ||
                    formData.password.length < 6
                ) {
                    alert(
                        "Пожалуйста, заполните все поля и используйте пароль длиной не менее 8 символов."
                    );
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                await sendEmailVerification(userCredential.user);

                alert(
                    "Письмо с подтверждением отправлено на вашу почту. Пожалуйста, подтвердите его, чтобы завершить регистрацию."
                );
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === "auth/email-already-in-use") {
                        alert(
                            "Пользователь с таким email уже существует. Пожалуйста, введите другой email или войдите в свой аккаунт."
                        );
                    } else {
                        alert(
                            `Произошла ошибка при регистрации: ${error.message}`
                        );
                    }
                } else {
                    alert("Произошла непредвиденная ошибка при регистрации.");
                }
            }
        }
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {
        setFormData({
            ...formData,
            [inputName]: e.target.value,
        });
    };
    return (
        <form
            action=""
            className="flex flex-col w-125 h-150 mx-auto gap-5 rounded-sm items-center justify-center"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="text-text tracking-tight text-3xl font-bold leading-tight text-center pb-6 pt-2">
                {type === "login" ? "Вход" : "Регистрация"}
            </h1>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="emailInput"
                    className="text-auth-text font-medium"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="emailInput"
                    id="emailInput"
                    placeholder="Введите ваш email"
                    className="flex w-90 h-7 rounded-sm text-text focus:outline-none focus:ring-2 focus:ring-auth-input border-none bg-auth-input-bg placeholder:text-auth-text p-5 transition-ring duration-200"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, "email")}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="passwordInput"
                    className="text-auth-text font-medium"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="passwordInput"
                    id="passwordInput"
                    placeholder="Введите ваш password"
                    className="flex w-90 h-7 rounded-sm text-text focus:outline-none focus:ring-2 focus:ring-auth-input border-none bg-auth-input-bg placeholder:text-auth-text p-5 transition-ring duration-200"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, "password")}
                />
            </div>
            <button
                type="submit"
                className="flex w-90 items-center justify-center overflow-hidden rounded-sm h-10 px-5 bg-auth-input text-text font-bold hover:bg-auth-input-hover transition-colors duration-200"
            >
                {type === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
            <Link href={type === "login" ? "register" : "login"}>
                {type === "login"
                    ? "Нет аккаунта? Зарегистрироваться"
                    : "Уже есть аккаунт? Войти"}
            </Link>
        </form>
    );
}
