import Avatar from "@/components/Chat/Avatar";
import { IUser } from "@/types/IUser";

interface IProps {
    members: IUser[] | null;
    uid: string;
    admins: string[];
}

export default function MemberList({ members, uid, admins }: IProps) {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between self-start border-b border-b-text/20 w-full pb-1 mb-4">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-text/50">
                        Members
                    </p>
                    <div className="text-xs flex items-center justify-center w-5 h-5 bg-auth-input-bg hover:bg-auth-input-bg/50 rounded-full">
                        {members?.length}
                    </div>
                </div>
                <button
                    type="button"
                    className="text-xs font-semibold text-auth-input"
                >
                    + Add Members
                </button>
            </div>
            <ul className="flex flex-col gap-2 bg-auth-input-bg/30 rounded-xl">
                {members?.map((member, index) => (
                    <li
                        key={index}
                        className="flex gap-3 border-b border-b-text/20 p-2 rounded-b-xl"
                    >
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
                            <p className="text-xs text-text/50">
                                @{member.username}
                            </p>
                        </div>
                        {admins.includes(member.uid) && (
                            <p className="text-xs p-1 bg-red-400/15 hover:bg-red-400/15 border border-red-400/50 rounded-lg h-fit">
                                Owner
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
