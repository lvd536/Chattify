import Chat from "./Chat";
import { User } from "firebase/auth";
import { useChatListData } from "@/hooks/useChat";

interface IProps {
    user: User;
}

export default function ChatList({ user }: IProps) {
    const { chats, users, loading, error } = useChatListData(user.uid);
    const success = chats && users && !loading;
    return (
        <ul className="mt-5 h-full">
            {success && users.length === chats.length ? (
                chats.map((c, index) => {
                    const messageDate =
                        c.lastMessageAt?.toDate().toDateString() !==
                        new Date().toDateString()
                            ? c.lastMessageAt?.toDate().toDateString()
                            : c.lastMessageAt?.toDate().toLocaleTimeString();
                    return (
                        <Chat
                            avatarUrl={users[index].photoURL || ""}
                            lastMessageAt={messageDate}
                            lastMessageText={c.lastMessageText}
                            name={users[index].displayName || ""}
                            uid={user.uid}
                            participantUid={users[index].uid}
                            key={users[index].uid}
                        />
                    );
                })
            ) : loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>
                    Error {error?.message}
                    Length {chats?.length} {users?.length}
                </div>
            ) : (
                <div className="flex justify-center text-xl">
                    Вы еще на начинали чаты!
                </div>
            )}
        </ul>
    );
}
