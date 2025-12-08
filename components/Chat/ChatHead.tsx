"use client";
import { useParticipant } from "@/hooks/useChat";
import Avatar from "./Avatar";
import Details from "./Details";
import Name from "./Name";

interface IProps {
    participantUid: string;
}

export default function ChatHead({ participantUid }: IProps) {
    const participant = useParticipant(participantUid);
    return (
        <div className="flex items-center justify-between h-16 border-b border-b-white/20 px-3">
            <div className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300">
                <Avatar
                    name={participant?.displayName || "A"}
                    src={participant?.photoURL || ""}
                    alt="User Avatar"
                />
                <div>
                    <Name>{participant?.displayName}</Name>
                    <Details>
                        last seen in{" "}
                        {participant?.lastSeen?.toDate() === new Date()
                            ? participant?.lastSeen
                                  ?.toDate()
                                  .toLocaleTimeString()
                            : participant?.lastSeen
                                  ?.toDate()
                                  .toLocaleDateString()}
                    </Details>
                </div>
            </div>
            <svg
                viewBox="0 0 34 34"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="#949dac"
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
        </div>
    );
}
