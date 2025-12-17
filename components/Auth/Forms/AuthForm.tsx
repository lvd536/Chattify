"use client";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateUserAuth } from "@/utils/auth";
import { routes } from "@/utils/consts";

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
        validateUserAuth(auth, formData, type, router);
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
            {type === "login" && (
                <Link
                    href={routes.auth.forgotPassword.path}
                    className="text-sm w-90 flex items-center justify-start text-text hover:text-auth-input transition-text duration-300"
                >
                    Forgot your password? Reset
                </Link>
            )}
            <button
                type="submit"
                className="flex w-90 items-center justify-center overflow-hidden rounded-sm h-10 px-5 bg-auth-input text-text font-bold hover:bg-auth-input-hover transition-colors duration-200"
            >
                {type === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
            <Link
                href={
                    type === "login"
                        ? routes.auth.register.path
                        : routes.auth.login.path
                }
            >
                {type === "login"
                    ? "Нет аккаунта? Зарегистрироваться"
                    : "Уже есть аккаунт? Войти"}
            </Link>
        </form>
    );
}
