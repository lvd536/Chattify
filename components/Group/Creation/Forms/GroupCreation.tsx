"use client";
import { useState } from "react";
import MemberSearch from "../MemberSearch";
import Avatar from "../Avatar";
import MemberList from "../MemberList";
import IMemberData from "@/types/IMemberData";
import Link from "next/link";
import { IGroup } from "@/types/IGroup";
import { createGroup } from "@/utils/group";

interface IProps {
    uid: string;
}

export default function GroupCreation({ uid }: IProps) {
    const [formData, setFormData] = useState<IMemberData>({
        name: "",
        description: "",
        members: [],
        photoURL: "",
    });
    const [searchValue, setSearchValue] = useState("");
    const [onSearch, setOnSearch] = useState<boolean>(false);
    const inputStyle =
        "w-full h-10 rounded-lg bg-edit-form-bg border-none text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleMemberDelete = (uid: string) => {
        setFormData({
            ...formData,
            members: formData.members.filter((member) => member.uid !== uid),
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const group = {
            name: formData.name,
            description: formData.description,
            members: [...formData.members.map((m) => m.uid), uid],
            admins: [uid],
            photoURL: formData.photoURL,
            lastMessageAt: "",
            lastMessageText: "",
        };
        createGroup(group).catch(() =>
            console.log("Error while creating group")
        );
    };
    return (
        <form
            action=""
            className="flex flex-col gap-2 p-2 mt-5"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="mx-auto text-lg font-semibold">
                Add information for your group
            </h1>
            <label htmlFor="groupName">Group name</label>
            <input
                type="text"
                name="name"
                id="groupName"
                className={inputStyle}
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
            />
            <label htmlFor="groupBio">Group bio</label>
            <input
                type="text"
                name="description"
                id="groupBio"
                className={inputStyle}
                value={formData.description}
                onChange={(e) => handleChange(e)}
                required
            />
            <label htmlFor="groupAvatar">Group avatar</label>
            <input
                type="text"
                name="photoURL"
                id="groupAvatar"
                className={inputStyle}
                value={formData.photoURL}
                onChange={(e) => handleChange(e)}
            />
            <div className="flex flex-col gap-2">
                <h1>Members</h1>
                <ul className="flex gap-2">
                    {formData.members.length > 0 ? (
                        formData.members.map((member) => (
                            <li
                                key={member.uid}
                                className="flex items-center justify-between gap-2 p-2 bg-audio-player w-fit rounded-full"
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src=""
                                        alt="User avatar"
                                        name={
                                            member.displayName ||
                                            member.username
                                        }
                                    />
                                    <p className="text-sm">
                                        {member.displayName}
                                    </p>
                                </div>
                                <button
                                    className="text-xs ml-2 hover:text-text/50 transition-text duration-300"
                                    onClick={() =>
                                        handleMemberDelete(member.uid)
                                    }
                                >
                                    x
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-text/50">No members</li>
                    )}
                </ul>
                <MemberSearch
                    searchValue={searchValue}
                    setOnSearch={setOnSearch}
                    setSearchValue={setSearchValue}
                />
                {onSearch && (
                    <MemberList
                        searchValue={searchValue}
                        uid={uid}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>
            <div className="pt-6 mt-3 flex flex-col-reverse sm:flex-row gap-4 items-center justify-center border-t border-edit-form-bg">
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
                    Create group
                </button>
            </div>
        </form>
    );
}
