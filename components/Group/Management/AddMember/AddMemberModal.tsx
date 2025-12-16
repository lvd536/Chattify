import { useState } from "react";
import FoundList from "../../Creation/FoundList";
import MemberSearch from "../../Creation/MemberSearch";
import { IHasMembers } from "@/types/IHasMembers";
import Avatar from "../../Creation/Avatar";
import { addMembersToGroup } from "@/utils/group";

interface IProps {
    uid: string;
    groupId: string;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMemberModal({ uid, groupId, setIsActive }: IProps) {
    const [searchValue, setSearchValue] = useState("");
    const [onSearch, setOnSearch] = useState<boolean>(false);
    const [formData, setFormData] = useState<IHasMembers>({
        members: [],
    });
    const handleMemberDelete = (uid: string) => {
        setFormData({
            ...formData,
            members: formData.members.filter((member) => member.uid !== uid),
        });
    };
    const handleAddMembers = () => {
        if (formData.members.length === 0) return;

        try {
            addMembersToGroup(
                groupId,
                formData.members.map((m) => m.uid)
            ).then(() => setIsActive(false));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="fixed top-1/24 right-1/24 sm:top-1/4 sm:right-1/4 p-2 bg-black/40 rounded-lg w-11/12 sm:w-1/2 h-11/12 sm:h-1/2">
            <div className="flex items-center justify-between">
                <button
                    className="p-2 rounded-lg bg-auth-input hover:bg-auth-input-hover transition-bg duration-300"
                    onClick={handleAddMembers}
                >
                    Add members
                </button>
                <button
                    className="p-2 rounded-lg bg-auth-input-bg hover:bg-auth-input-bg/90 transition-bg duration-300"
                    onClick={() => setIsActive(false)}
                >
                    Cancel
                </button>
            </div>
            <ul className="flex gap-2 my-2">
                {formData.members.length > 0 ? (
                    formData.members.map((member) => (
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
            <MemberSearch
                searchValue={searchValue}
                setOnSearch={setOnSearch}
                setSearchValue={setSearchValue}
            />
            {onSearch && (
                <FoundList
                    searchValue={searchValue}
                    uid={uid}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
        </div>
    );
}
function addMembers(
    groupId: string,
    members: { uid: string; displayName: string; username: string }[]
) {
    throw new Error("Function not implemented.");
}
