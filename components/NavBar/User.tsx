import Link from "next/link";
import Avatar from "../Chat/Avatar";
import Name from "../Chat/Name";
import { routes } from "@/utils/consts";

interface IProps {
    name: string;
    avatarUrl: string;
    uid: string;
    participantUid: string;
}

export default function User({ name, avatarUrl, uid, participantUid }: IProps) {
    return (
        <li>
            <Link
                href={routes.home.chat.path + `${uid}_${participantUid}`}
                className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
            >
                <Avatar alt="User Avatar" src={avatarUrl} name={name} />
                <Name>{name}</Name>
            </Link>
        </li>
    );
}
