"use client";

import { setProfile } from "@/hooks/useProfile";
import IProfileEditData from "@/types/IProfileEditData";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";

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
            window.location.reload();
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

            <label
                htmlFor="displayName"
                className="self-start text-white text-sm font-medium text-nowrap"
            >
                Display Name
            </label>
            <input
                type="text"
                name="displayName"
                id="displayName"
                required
                className="w-full h-10 rounded-lg bg-[#283039] border-none text-white px-4 focus:ring-1 placeholder:text-[#9dabb9] transition-all duration-300"
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
                className="self-start text-white text-sm font-medium"
            >
                Username
            </label>
            <div className="flex items-center w-full h-10 rounded-lg focus-within:ring-1 focus-within:ring-primary bg-[#283039] border-none text-white px-4 focus:ring-1 placeholder:text-[#9dabb9] transition-all duration-300">
                <span className="p-2 text-[#9dabb9] select-none">@</span>
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
            <label
                htmlFor="displayName"
                className="self-start text-white text-sm font-medium text-nowrap"
            >
                Avatar Url
            </label>
            <input
                type="text"
                name="photoUrl"
                id="photoUrl"
                required
                className="w-full h-10 rounded-lg bg-[#283039] border-none text-white px-4 focus:ring-1 placeholder:text-[#9dabb9] transition-all duration-300"
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
                className="self-start text-white text-sm font-medium"
            >
                Bio
            </label>
            <textarea
                name="bio"
                id="bio"
                className="w-full h-32 rounded-lg bg-[#283039] border-none text-white p-4 focus:ring-1 focus:ring-primary placeholder:text-[#9dabb9] resize-none transition-all leading-relaxed"
                placeholder="Tell about yourself"
                value={formData.description}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        description: e.target.value,
                    });
                }}
            />
            <div className="pt-6 mt-3 flex flex-col-reverse sm:flex-row gap-4 justify-end border-t border-[#283039]">
                <Link
                    href={"/home"}
                    className="flex items-center h-12 px-8 bg-[#283039] hover:bg-[#323b46] text-white font-bold rounded-lg transition-colors duration-300 focus:ring-[#9dabb9]/50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="h-12 px-8 bg-primary hover:bg-blue-600/70 text-white font-bold rounded-lg shadow-lg shadow-blue-900/20 duration-300 transition-all active:scale-95"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
