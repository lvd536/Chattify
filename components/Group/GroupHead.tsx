"use client";
import Avatar from "../Chat/Avatar";
import Details from "../Chat/Details";
import Name from "../Chat/Name";
import { useState } from "react";
import Actions from "./Actions";
import Link from "next/link";
import BackToHome from "../Chat/BackToHome";
import { useGroup } from "@/hooks/useGroup";

interface IProps {
    uid: string;
    groupId: string;
}

export default function GroupHead({ uid, groupId }: IProps) {
    const [isActionsOpen, setIsActionsOpen] = useState<boolean>();
    const { group, loading, error } = useGroup(groupId);
    const isAdmin = group?.admins.includes(uid) || false;
    return (
        <>
            {group ? (
                <div className="flex relative items-center justify-between h-1/15 border-b border-b-white/20 px-3">
                    <div className="flex items-center gap-2">
                        <BackToHome />
                        <Link
                            href={`/home/group/manage/${groupId}_${uid}`}
                            className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
                        >
                            <Avatar
                                name={group.name}
                                src={group.photoURL || ""}
                                alt="User Avatar"
                            />
                            <div>
                                <Name>{group.name}</Name>
                                <Details>
                                    {group.members.length} members
                                </Details>
                            </div>
                        </Link>
                    </div>
                    <svg
                        viewBox="0 0 34 34"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#949dac"
                        onClick={() => setIsActionsOpen((prev) => !prev)}
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M19 16a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0 13a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm0-26a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3z"
                                fill="#37"
                            ></path>
                        </g>
                    </svg>
                    {isActionsOpen && (
                        <Actions
                            groupId={groupId}
                            uid={uid}
                            isAdmin={isAdmin}
                        />
                    )}
                </div>
            ) : loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error...</div>
            ) : (
                <>Something went wrong</>
            )}
        </>
    );
}
