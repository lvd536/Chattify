"use client";
import Input from "@/components/Form/Input";
import { useGroup } from "@/hooks/useGroup";
import { routes } from "@/utils/consts";
import { updateGroupInfo } from "@/utils/group";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    const navigator = useRouter();
    const inputStyle =
        "w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300";
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
            updateGroupInfo(groupId, formData)
                .then(() => navigator.push("/home"))
                .catch(() => console.log("Error while creating group"));
        });
    };
    return (
        <>
            {group ? (
                <form action="" className="px-4 my-4" onSubmit={handleSubmit}>
                    <h1 className="self-start font-semibold text-sm text-text/50 border-b border-b-text/20 w-full pb-1 mb-4">
                        Personal Information
                    </h1>
                    <Input
                        labelName="Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            });
                        }}
                        required
                    />
                    <Input
                        labelName="Avatar"
                        name="photoURL"
                        id="groupName"
                        value={formData.photoURL}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                photoURL: e.target.value,
                            });
                        }}
                        required
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
                        className={inputStyle + " p-2 min-h-25 max-h-50"}
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            });
                        }}
                    />
                    <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-end mt-3">
                        <Link
                            href={routes.home.get.path}
                            className="flex items-center justify-center h-10 px-6 bg-edit-form-bg hover:bg-edit-form-bg/80 text-text font-bold rounded-lg transition-colors duration-300 focus:ring-edit-form-text/50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="h-10 px-6 bg-primary hover:bg-blue-600/70 text-text font-bold rounded-lg shadow-lg shadow-blue-900/20 duration-300 transition-all active:scale-95"
                        >
                            Save Changes
                        </button>
                    </div>
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
