import Link from "next/link";
import Avatar from "../Chat/Avatar";
import Details from "../Chat/Details";
import Name from "../Chat/Name";

interface IProps {
    name: string;
    avatarUrl: string;
    lastMessageAt: string;
    lastMessageText: string;
    uid: string;
    groupId: string;
}

export default function Group({
    name,
    avatarUrl,
    lastMessageAt,
    lastMessageText,
    groupId,
    uid,
}: IProps) {
    return (
        <li>
            <Link
                href={`/home/group/${groupId}_${uid}`}
                className="flex relative items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
            >
                <div className="relative">
                    <Avatar alt="Group Avatar" src={avatarUrl} name={name} />
                </div>
                <div className="flex flex-col w-[calc(100%-60px)]">
                    <Name>{name} Group</Name>
                    <Details lastMessageAt={lastMessageAt}>
                        {lastMessageText}
                    </Details>
                </div>
            </Link>
        </li>
    );
}
