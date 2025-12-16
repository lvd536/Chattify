import { Dispatch, SetStateAction } from "react";
import Avatar from "../../Chat/Avatar";
import Name from "../../Chat/Name";
import { IHasMembers } from "@/types/IHasMembers";

interface IProps<T extends IHasMembers> {
    displayName: string;
    username: string;
    avatarUrl: string;
    uid: string;
    formData: T;
    setFormData: Dispatch<SetStateAction<T>>;
}

export default function Member<T extends IHasMembers>({
    displayName,
    username,
    avatarUrl,
    uid,
    formData,
    setFormData,
}: IProps<T>) {
    const handleAddMember = () => {
        if (formData.members.some((m) => m.uid === uid)) {
            alert(
                "This user is already a member of the group. Please choose another user."
            );
            return;
        }
        const newMember = {
            uid,
            displayName,
            username,
        };
        setFormData((prev) => ({
            ...prev,
            members: [...prev.members, newMember],
        }));
    };
    return (
        <li className="flex items-center gap-4 p-2 justify-between hover:bg-white/2 transition-bg duration-300">
            <div className="flex items-center gap-4">
                <Avatar alt="User Avatar" src={avatarUrl} name={displayName} />
                <div>
                    <Name>{displayName}</Name>
                    <p className="text-text/50 text-xs">@{username}</p>
                </div>
            </div>
            <button
                type="button"
                className="w-7 h-7 bg-auth-input hover:bg-auth-input-hover transition-bg duration-300 rounded-sm"
                onClick={handleAddMember}
            >
                +
            </button>
        </li>
    );
}
