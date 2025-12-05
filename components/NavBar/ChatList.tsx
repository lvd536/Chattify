import Chat from "./Chat";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { User } from "firebase/auth";

interface IProps {
    user: User;
}

export default function ChatList({ user }: IProps) {
    const chatsQuery = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
    );
    const [chats, chatsLoading, chatsError] = useCollectionData(chatsQuery);
    const allParticipantUids = chats
        ? chats.flatMap((chat) => chat.participants)
        : [];
    const otherParticipantUids = [
        ...new Set(allParticipantUids.filter((uid) => uid !== user.uid && uid)),
    ];
    const usersQuery =
        otherParticipantUids.length > 0
            ? query(
                  collection(db, "users"),
                  where("uid", "in", otherParticipantUids)
              )
            : null;
    const [users, usersLoading, usersError] = useCollectionData(usersQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });
    return (
        <ul className="mt-5">
            {chats &&
            users &&
            !chatsLoading &&
            !usersLoading &&
            users.length === chats.length ? (
                chats.map((c, index) => (
                    <Chat
                        avatarUrl={users[index].photoUrl || ""}
                        lastMessageAt={c.lastMessageAt.toDate().toDateString()}
                        lastMessageText={c.lastMessageText}
                        name={users[index].displayName || ""}
                        uid={user.uid}
                        participantUid={users[index].uid}
                        key={users[index].uid}
                    />
                ))
            ) : chatsLoading || usersLoading ? (
                <div>Loading...</div>
            ) : chatsError || usersError ? (
                <div>
                    Error {chatsError?.message} {usersError?.message}
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
