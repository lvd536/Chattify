"use client";
import { useParticipant } from "@/hooks/useChat";
import Avatar from "./Avatar";
import Details from "./Details";
import Name from "./Name";
import { IUser } from "@/types/IUser";
import { useEffect, useState } from "react";
import Actions from "./Actions";
import Link from "next/link";
import BackToHome from "./BackToHome";

interface IProps {
    uid: string;
    participantUid: string;
    chatId: string;
}

export default function ChatHead({ participantUid, uid, chatId }: IProps) {
    const participant = useParticipant(participantUid);
    const [lastSeenAt, setLastSeenAt] = useState<string>("Loading...");
    const [isActionsOpen, setIsActionsOpen] = useState<boolean>();

    function formatLastSeen(participant: IUser | undefined) {
        if (!participant || !participant.lastSeen) return "Loading...";

        const lastSeenDate = participant.lastSeen.toDate();
        const now = new Date();
        const diffMs = now.getTime() - lastSeenDate.getTime();

        if (diffMs < 10000) return "Online";

        const sameDay =
            lastSeenDate.getFullYear() === now.getFullYear() &&
            lastSeenDate.getMonth() === now.getMonth() &&
            lastSeenDate.getDate() === now.getDate();

        return sameDay
            ? "last seen at " + lastSeenDate.toLocaleTimeString()
            : "last seen at " + lastSeenDate.toLocaleDateString();
    }

    useEffect(() => {
        setTimeout(() => setLastSeenAt(formatLastSeen(participant)));
        const id = setInterval(() => {
            setLastSeenAt(formatLastSeen(participant));
        }, 1000);

        return () => clearInterval(id);
    }, [participant]);
    return (
        <>
            {participant ? (
                <div className="flex relative items-center justify-between h-1/15 border-b border-b-white/20 px-3">
                    <div className="flex items-center gap-2">
                        <BackToHome />
                        <Link
                            href={`/home/user/${uid}_${participant.uid}_${chatId}`}
                            className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
                        >
                            <Avatar
                                name={participant.displayName || "A"}
                                src={participant.photoURL || ""}
                                alt="User Avatar"
                            />
                            <div>
                                <Name>{participant.displayName}</Name>
                                <Details>{lastSeenAt}</Details>
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
                    {isActionsOpen && <Actions chatId={chatId} />}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
