import { useSearchUsers } from "@/hooks/useChat";
import Member from "./Member";
import { Dispatch, SetStateAction } from "react";
import { IHasMembers } from "@/types/IHasMembers";

interface IProps<T extends IHasMembers> {
    searchValue: string;
    uid: string;
    formData: T;
    setFormData: Dispatch<SetStateAction<T>>;
}

export default function FoundList<T extends IHasMembers>({
    searchValue,
    uid,
    formData,
    setFormData,
}: IProps<T>) {
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
