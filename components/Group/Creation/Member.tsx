import IMemberData from "@/types/IMemberData";
import { Dispatch, SetStateAction } from "react";
import Avatar from "../../Chat/Avatar";
import Name from "../../Chat/Name";

interface IProps {
    displayName: string;
    username: string;
    avatarUrl: string;
    uid: string;
    formData: IMemberData;
    setFormData: Dispatch<SetStateAction<IMemberData>>;
}

export default function Member({
    displayName,
    username,
    avatarUrl,
    uid,
    formData,
    setFormData,
}: IProps) {
    const handleAddMember = () => {
        if (formData.members.find((m) => m.uid === uid)) {
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
        setFormData({
            ...formData,
            members: [...formData.members, newMember],
        });
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
