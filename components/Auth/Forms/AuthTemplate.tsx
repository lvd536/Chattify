"use client";
import { useState } from "react";

interface IFormData {
    email: string;
    password: string;
}

interface IProps {
    type: "login" | "register";
}

export default function AuthTemplate({ type }: IProps) {
    const [formData, setFormData] = useState<IFormData>({
        email: "",
        password: "",
    });

    const handleSubmit = () => {
        
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
            onSubmit={handleSubmit}
        >
            <h1 className="text-white tracking-tight text-3xl font-bold leading-tight text-center pb-6 pt-2">
                {type === "login" ? "Вход" : "Регистрация"}
            </h1>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="emailInput"
                    className="text-[#A0A0A0] font-medium"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="emailInput"
                    id="emailInput"
                    placeholder="Введите ваш email"
                    className="flex w-90 h-7 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3390EC] border-none bg-[#2A2A2A] placeholder:text-[#A0A0A0] p-5 transition-ring duration-200"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, "email")}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="passwordInput"
                    className="text-[#A0A0A0] font-medium"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="passwordInput"
                    id="passwordInput"
                    placeholder="Введите ваш password"
                    className="flex w-90 h-7 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3390EC] border-none bg-[#2A2A2A] placeholder:text-[#A0A0A0] p-5 transition-ring duration-200"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, "password")}
                />
            </div>
            <button
                type="submit"
                className="flex w-90 items-center justify-center overflow-hidden rounded-sm h-10 px-5 bg-[#3390EC] text-white font-bold hover:bg-[#2b7bce] transition-colors duration-200"
            >
                {type === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
        </form>
    );
}
