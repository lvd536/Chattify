"use client";
import { useGroup } from "@/hooks/useGroup";
import { useState } from "react";

interface IFormData {
    name: string;
    description: string;
    photoURL: string;
}

interface IProps {
    groupId: string;
    name: string;
    description: string;
    photoURL: string;
}

export default function EditForm({
    groupId,
    name,
    description,
    photoURL,
}: IProps) {
    const { group, loading, error } = useGroup(groupId);
    const [formData, setFormData] = useState<IFormData>({
        name: name || "",
        description: description || "",
        photoURL: photoURL || "",
    });
    const inputStyle =
        "w-full h-10 rounded-lg bg-edit-form-bg border border-text/40 text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300 mb-2";
    return (
        <>
            {group ? (
                <form action="" className="px-4 my-4">
                    <h1 className="self-start font-semibold text-sm text-text/50 border-b border-b-white/20 w-full pb-1 mb-4">
                        Personal Information
                    </h1>

                    <label
                        htmlFor="name"
                        className="self-start text-text/80 text-sm font-medium text-nowrap"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className={inputStyle}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            });
                        }}
                    />
                    <label
                        htmlFor="description"
                        className="self-start text-text/80 text-sm font-medium text-nowrap"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className={inputStyle + " p-2"}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            });
                        }}
                    />
                    <label
                        htmlFor="photoURL"
                        className="self-start text-text/80 text-sm font-medium text-nowrap"
                    >
                        Avatar
                    </label>
                    <input
                        type="text"
                        name="photoURL"
                        id="photoURL"
                        className={inputStyle}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                photoURL: e.target.value,
                            });
                        }}
                    />
                </form>
            ) : loading ? (
                <>Loading...</>
            ) : error ? (
                <>Error: {error}</>
            ) : (
                <>Group not found</>
            )}
        </>
    );
}
