import { routes } from "@/utils/consts";
import Link from "next/link";

interface IProps {
    uid: string;
}

export default function CreateGroupBtn({ uid }: IProps) {
    return (
        <Link
            href={routes.home.createGroup.path + uid}
            className="absolute right-1 bottom-3 px-4 py-2 bg-auth-input hover:bg-auth-input-hover transition-bg duration-300 rounded-4xl"
        >
            + Create group
        </Link>
    );
}
