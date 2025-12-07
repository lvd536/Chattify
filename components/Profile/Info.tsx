import type { DocumentData } from "firebase/firestore";
import Link from "next/link";
import Avatar from "./Avatar";

interface IProps {
    user: DocumentData | undefined;
}

export default function Info({ user }: IProps) {
    return (
        <>
            <div className="flex items-center justify-between w-full py-2 px-4 h-13 border-b border-b-white/30">
                <h1 className="font-bold">Profile</h1>
                <Link
                    href={"/home"}
                    className="flex items-center justify-center p-2 w-8 h-8 bg-chat-bg rounded-sm"
                >
                    X
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
                <Avatar alt="" name="Display" src={user?.photoURL || ""} />
                <h1 className="font-bold text-lg mt-2">{user?.displayName}</h1>
                <p className="text-[#707991]">@{user?.username}</p>
            </div>
        </>
    );
}
