import Avatar from "@/components/Chat/Avatar";
import { IUserClient } from "@/types/IUserClient";

interface IProps {
    member: IUserClient;
    uid: string;
    isAdmin: boolean;
}

export default function MemberInfo({ member, isAdmin, uid }: IProps) {
    return (
        <div className="flex gap-3 items-center">
            <Avatar
                alt="Member photo"
                name={member.displayName || member.username || ""}
                src={member.photoURL || ""}
            />
            <div>
                <p>
                    {member.displayName || member.username}
                    {member.uid === uid ? " (You)" : ""}
                </p>
                <p className="text-xs text-text/50">@{member.username}</p>
            </div>
            {isAdmin && (
                <p className="self-start text-xs p-1 bg-red-400/15 hover:bg-red-400/15 border border-red-400/50 rounded-lg h-fit">
                    Admin
                </p>
            )}
        </div>
    );
}
