import Link from "next/link";
import Avatar from "../Chat/Avatar";
import Details from "../Chat/Details";
import Name from "../Chat/Name";
import { useUnreadMessages } from "@/hooks/useChat";

interface IProps {
    name: string;
    avatarUrl: string;
    lastMessageAt: string;
    lastMessageText: string;
    uid: string;
    chatId: string;
    participantUid?: string;
}

export default function Chat({
    name,
    avatarUrl,
    lastMessageAt,
    lastMessageText,
    chatId,
    uid,
    participantUid,
}: IProps) {
    const { unreadMessages } = useUnreadMessages(chatId, uid);
    return (
        <li>
            <Link
                href={`/home/chat/${uid}_${participantUid}`}
                className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
            >
                <Avatar alt="User Avatar" src={avatarUrl} name={name} />
                <div className="flex flex-col w-[calc(100%-60px)]">
                    <Name messagesCount={unreadMessages?.length}>{name}</Name>
                    <Details lastMessageAt={lastMessageAt}>
                        {lastMessageText}
                    </Details>
                </div>
            </Link>
        </li>
    );
}
