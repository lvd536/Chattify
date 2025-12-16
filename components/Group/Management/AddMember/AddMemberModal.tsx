import { useState } from "react";
import FoundList from "../../Creation/FoundList";
import MemberSearch from "../../Creation/MemberSearch";
import { IHasMembers } from "@/types/IHasMembers";
import { addMembersToGroup } from "@/utils/group";
import MemberModalActions from "./MemberModalActions";
import MemberModalList from "./MemberModalList";

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
            <MemberModalActions
                handleAddMembers={handleAddMembers}
                setIsActive={() => setIsActive(false)}
            />
            <MemberModalList
                handleMemberDelete={handleMemberDelete}
                members={formData.members}
            />
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
