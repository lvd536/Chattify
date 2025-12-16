import { useSearchUsers } from "@/hooks/useChat";
import User from "./User";

interface IProps {
    searchValue: string;
    uid: string;
}

export default function UserList({ searchValue, uid }: IProps) {
    const { users, loading, error } = useSearchUsers(searchValue, uid);
    return (
        <ul className="sm:block mt-5 h-full">
            {users && !loading && !error ? (
                users.map((c, index) => (
                    <User
                        avatarUrl={users[index].photoURL ?? ""}
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
