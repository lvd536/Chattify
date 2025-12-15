import { useSearchUsers } from "@/hooks/useChat";
import Member from "./Member";
import IMemberData from "@/types/IMemberData";
import { Dispatch, SetStateAction } from "react";

interface IProps {
    searchValue: string;
    uid: string;
    formData: IMemberData;
    setFormData: Dispatch<SetStateAction<IMemberData>>;
}

export default function MemberList({
    searchValue,
    uid,
    formData,
    setFormData,
}: IProps) {
    const { users, loading, error } = useSearchUsers(searchValue, uid);
    return (
        <ul className="sm:block mt-5 h-full">
            {users && !loading && !error ? (
                users
                    .slice(0, 5)
                    .map((c, index) => (
                        <Member
                            avatarUrl={c.photoURL ?? ""}
                            displayName={c.displayName || ""}
                            username={c.username || ""}
                            uid={c.uid}
                            key={index}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ))
            ) : loading ? (
                <div>Loading...</div>
            ) : (
                <div>Error</div>
            )}
        </ul>
    );
}
