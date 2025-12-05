import { useSearchUsers } from "@/hooks/useChat";
import User from "./User";
import { useEffect } from "react";

interface IProps {
    // user: IUser;
    searchValue: string;
    uid: string;
}

export default function UserList({ searchValue, uid }: IProps) {
    const { users, loading, error } = useSearchUsers(searchValue);
    useEffect(() => {
        console.log(users);
    }, [users]);
    return (
        <ul className="mt-5">
            {users && !loading && !error ? (
                users.map((c, index) => (
                    <User
                        avatarUrl={users[index].photoUrl ?? ""}
                        name={users[index].displayName || ""}
                        uid={uid}
                        participantUid={users[index].uid}
                        key={c.uid}
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
