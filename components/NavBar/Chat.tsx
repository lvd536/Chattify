import Link from "next/link";
import Avatar from "../Chat/Avatar";
import Details from "../Chat/Details";
import Name from "../Chat/Name";
import { useUnreadMessages } from "@/hooks/useChat";
import { Timestamp } from "firebase/firestore";
import { routes } from "@/utils/consts";

interface IProps {
    name: string;
    avatarUrl: string;
    lastMessageAt: string;
    lastMessageText: string;
    uid: string;
    chatId: string;
    participantUid?: string;
    lastSeen: Timestamp;
}

export default function Chat({
    name,
    avatarUrl,
    lastMessageAt,
    lastMessageText,
    chatId,
    uid,
    participantUid,
    lastSeen,
}: IProps) {
    const { unreadMessages } = useUnreadMessages(chatId, uid);
    function isOnline(lastSeen: Timestamp) {
        if (!lastSeen) return false;

        const lastSeenDate = lastSeen.toDate();
        const now = new Date();
        const diffMs = now.getTime() - lastSeenDate.getTime();

        if (diffMs < 10000) return true;
        return false;
    }
    return (
        <li>
            <Link
                href={routes.home.chat.path + `${uid}_${participantUid}`}
                className="flex relative items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
            >
                <div className="relative">
                    <Avatar alt="User Avatar" src={avatarUrl} name={name} />
                    {isOnline(lastSeen) && (
                        <div className="absolute h-1.5 sm:w-2.5 w-1.5 sm:h-2.5 right-1 bottom-0.5 bg-cyan-500 rounded-full" />
                    )}
                </div>
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
