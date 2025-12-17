"use client";

import { setProfile } from "@/hooks/useProfile";
import IProfileEditData from "@/types/IProfileEditData";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { auth } from "@/utils/firebase";
import { routes } from "@/utils/consts";
import Input from "../Form/Input";

interface IProps {
    user: DocumentData | undefined;
}

export default function EditForm({ user }: IProps) {
    const [formData, setFormData] = useState<IProfileEditData>({
        displayName: user?.displayName,
        username: user?.username,
        description: user?.description,
        photoURL: user?.photoURL,
    });
    const isEmailUser =
        auth.currentUser?.providerData[0]?.providerId !== "google.com";
    function checkImage(url: string, cb: (ok: boolean) => void) {
        const img = new Image();
        img.onload = () => cb(true);
        img.onerror = () => cb(false);
        img.src = url;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkImage(formData.photoURL, (ok) => {
            if (!ok && formData.photoURL !== "") {
                alert("Invalid image url");
                return;
            }
            setProfile(user?.uid, formData);
        });
    };
    return (
        <form
            action=""
            className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-8"
            onSubmit={handleSubmit}
        >
            <h1 className="self-start font-semibold border-b border-b-white/30 w-full pb-3">
                Personal Information
            </h1>
            <Input
                labelName="Display Name"
                name="displayName"
                required
                value={formData.displayName}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        displayName: e.target.value,
                    });
                }}
            />
            <label
                htmlFor="username"
                className="self-start text-text text-sm font-medium"
            >
                Username
            </label>
            <div className="flex items-center w-full h-10 rounded-lg focus-within:ring-1 focus-within:ring-primary bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300">
                <span className="p-2 text-edit-form-text select-none">@</span>
                <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="focus:outline-none"
                    value={formData.username}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            username: e.target.value,
                        });
                    }}
                />
            </div>
            <Input
                labelName="Avatar Url"
                name="photoUrl"
                value={formData.photoURL}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        photoURL: e.target.value,
                    });
                }}
            />
            <label
                htmlFor="bio"
                className="self-start text-text text-sm font-medium"
            >
                Bio
            </label>
            <textarea
                name="bio"
                id="bio"
                className="w-full h-32 rounded-lg bg-edit-form-bg border-none text-text p-4 focus:ring-1 focus:ring-primary placeholder:text-edit-form-text resize-none transition-all leading-relaxed"
                placeholder="Tell about yourself"
                value={formData.description}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        description: e.target.value,
                    });
                }}
            />
            <div className="pt-6 mt-3 flex flex-col gap-4 justify-end border-t border-edit-form-bg">
                {isEmailUser && (
                    <Link
                        href={routes.home.profile.resetPassword.path}
                        className="flex items-center justify-center h-12 px-8 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                    >
                        Reset password
                    </Link>
                )}
                <div className="flex flex-col-reverse sm:flex-row gap-4">
                    <Link
                        href={routes.home.get.path}
                        className="flex items-center justify-center h-12 px-8 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="h-12 px-8 bg-primary hover:bg-blue-600/70 text-text font-bold rounded-lg shadow-lg shadow-blue-900/20 duration-300 transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
}
