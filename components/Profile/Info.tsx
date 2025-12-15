import type { DocumentData } from "firebase/firestore";
import Avatar from "./Avatar";
import Header from "../Header";

interface IProps {
    user: DocumentData | undefined;
}

export default function Info({ user }: IProps) {
    return (
        <>
            <Header>Profile</Header>
            <div className="flex flex-col items-center justify-center mt-5">
                <Avatar
                    alt=""
                    name={user?.username}
                    src={user?.photoURL || ""}
                />
                <h1 className="font-bold text-lg mt-2">{user?.displayName}</h1>
                <p className="text-details">@{user?.username}</p>
            </div>
        </>
    );
}
