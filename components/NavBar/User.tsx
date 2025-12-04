import Link from "next/link";
import Avatar from "../Chat/Avatar";
import Name from "../Chat/Name";

interface IProps {
    name: string;
    avatarUrl: string;
    uid: string;
}

export default function User({ name, avatarUrl, uid }: IProps) {
    return (
        <li>
            <Link
                href={`/home/chat/${uid}`}
                className="flex items-center gap-4 p-2 hover:bg-white/2 transition-bg duration-300"
            >
                <Avatar alt="User Avatar" src={avatarUrl} name={name} />
                <Name>{name}</Name>
            </Link>
        </li>
    );
}
