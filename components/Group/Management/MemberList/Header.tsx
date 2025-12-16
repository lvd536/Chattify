import { useState } from "react";
import AddMemberModal from "../AddMember/AddMemberModal";

interface IProps {
    membersCount: number;
    uid: string;
    groupId: string;
}

export default function Header({ membersCount, groupId, uid }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="flex items-center justify-between self-start border-b border-b-text/20 w-full pb-1 mb-4">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-text/50">Members</p>
                <div className="text-xs flex items-center justify-center w-5 h-5 bg-auth-input-bg hover:bg-auth-input-bg/50 rounded-full">
                    {membersCount}
                </div>
            </div>
            <button
                type="button"
                className="text-xs font-semibold text-auth-input"
                onClick={() => setIsModalOpen(true)}
            >
                + Add Members
            </button>
            {isModalOpen && (
                <AddMemberModal
                    groupId={groupId}
                    uid={uid}
                    setIsActive={setIsModalOpen}
                />
            )}
        </div>
    );
}
