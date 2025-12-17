"use client";
import { useState } from "react";
import MemberSearch from "../../MemberSearch";
import FoundList from "../../FoundList";
import IMemberData from "@/types/IMemberData";
import { createGroup } from "@/utils/group";
import { useRouter } from "next/navigation";
import Input from "@/components/Form/Input";
import MembersToAdd from "./MembersToAdd";
import GroupCreationActions from "./GroupCreationActions";
import { routes } from "@/utils/consts";

interface IProps {
    uid: string;
}

export default function GroupCreation({ uid }: IProps) {
    const [formData, setFormData] = useState<IMemberData>({
        name: "",
        description: "",
        members: [],
        photoURL: "",
    });
    const [searchValue, setSearchValue] = useState("");
    const [onSearch, setOnSearch] = useState<boolean>(false);
    const navigator = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleMemberDelete = (uid: string) => {
        setFormData({
            ...formData,
            members: formData.members.filter((member) => member.uid !== uid),
        });
    };
    function checkImage(url: string, cb: (ok: boolean) => void) {
        const img = new Image();
        img.onload = () => cb(true);
        img.onerror = () => cb(false);
        img.src = url;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkImage(formData.photoURL, (ok) => {
            if (!ok && formData.photoURL !== "") {
                alert("Invalid image url");
                return;
            }
            const group = {
                name: formData.name,
                description: formData.description,
                members: [...formData.members.map((m) => m.uid), uid],
                admins: [uid],
                photoURL: formData.photoURL,
                lastMessageAt: "",
                lastMessageText: "",
            };
            createGroup(group)
                .then(() => navigator.push(routes.home.get.path))
                .catch(() => console.log("Error while creating group"));
        });
    };
    return (
        <form
            action=""
            className="flex flex-col gap-2 p-2 mt-5"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="mx-auto text-lg font-semibold">
                Add information for your group
            </h1>
            <Input
                labelName="Group name"
                name="name"
                id="groupName"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
            />
            <Input
                labelName="Group bio"
                name="description"
                id="groupBio"
                value={formData.description}
                onChange={(e) => handleChange(e)}
                required
            />
            <Input
                labelName="Group avatar"
                name="photoURL"
                id="groupAvatar"
                value={formData.photoURL}
                onChange={(e) => handleChange(e)}
            />
            <div className="flex flex-col gap-2">
                <h1>Members</h1>
                <MembersToAdd
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
            <GroupCreationActions />
        </form>
    );
}
