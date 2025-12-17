import Avatar from "../../Avatar";

interface IProps {
    members: {
        uid: string;
        displayName: string;
        username: string;
    }[];
    handleMemberDelete: (uid: string) => void;
}

export default function MembersToAdd({ members, handleMemberDelete }: IProps) {
    return (
        <ul className="flex gap-2">
            {members.length > 0 ? (
                members.map((member) => (
                    <li
                        key={member.uid}
                        className="flex items-center justify-between gap-2 p-2 bg-audio-player w-fit rounded-full"
                    >
                        <div className="flex items-center gap-2">
                            <Avatar
                                src=""
                                alt="User avatar"
                                name={member.displayName || member.username}
                            />
                            <p className="text-sm">{member.displayName}</p>
                        </div>
                        <button
                            className="text-xs ml-2 hover:text-text/50 transition-text duration-300"
                            onClick={() => handleMemberDelete(member.uid)}
                        >
                            x
                        </button>
                    </li>
                ))
            ) : (
                <li className="text-sm text-text/50">No members</li>
            )}
        </ul>
    );
}
