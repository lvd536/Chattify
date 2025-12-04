import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { IUser } from "@/types/IUser";
import { IChat } from "@/types/IChat";
import { IMessage } from "@/types/IMessage";
import { useCollection } from "react-firebase-hooks/firestore";

export async function searchUsers(search: string) {
    if (!search) return [];

    const usersRef = collection(db, "users");

    const start = search.toLowerCase();
    const end = start + "\uf8ff";

    const q1 = query(
        usersRef,
        where("username", ">=", start),
        where("username", "<=", end),
        limit(10)
    );

    const q2 = query(
        usersRef,
        where("displayName", ">=", start),
        where("displayName", "<=", end),
        limit(10)
    );

    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const users = [...snap1.docs, ...snap2.docs]
        .map((d) => {
            const data = d.data() as Omit<IUser, "uid">;
            return { uid: d.id, ...data } satisfies IUser;
        })
        .reduce<IUser[]>((acc, item) => {
            if (!acc.some((x) => x.uid === item.uid)) acc.push(item);
            return acc;
        }, []);

    return users;
}

export async function getUserChats(uid: string) {
    const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", uid)
    );

    const snap = await getDocs(q);

    return (
        (snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as IChat[]) ?? []
    );
}

export function useChatMessages(chatId: string) {
    const messagesRef = collection(db, "messages");

    const q = query(
        messagesRef,
        where("chatId", "==", chatId),
        orderBy("createdAt", "asc")
    );

    const [snap, loading, error] = useCollection(q);

    const messages =
        (snap?.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as IMessage[]) ?? [];

    return { messages, loading, error };
}

export function useLastMessage(chatId: string) {
    const ref = collection(db, "messages");

    const q = query(
        ref,
        where("chatId", "==", chatId),
        orderBy("createdAt", "desc"),
        limit(1)
    );

    const [snap] = useCollection(q);

    const message = snap?.docs[0]
        ? { id: snap.docs[0].id, ...snap.docs[0].data() }
        : null;

    return message as IMessage | null;
}

export async function getUser(uid: string) {
    const ref = collection(db, "users");
    const q = query(ref, where("uid", "==", uid));
    const user = await getDocs(q);
    if (user.empty) {
        throw new Error(
            "User not found. This should not happen. Please report this issue."
        );
    }
    return user.docs[0].data() as IUser;
}

export async function getChatParticipant(
    chatId: string,
    uid: string
): Promise<IUser | null> {
    const ref = collection(db, "chats");

    const q = query(ref, where("id", "==", chatId));

    const snap = await getDocs(q);
    if (snap) {
        if (snap.docs[0]) {
            const data = snap.docs[0].data();
            const participant = data.participants.find(
                (p: string) => p !== uid
            );
            if (participant) {
                const user = await getUser(participant);
                console.log(user);
                if (user) return user;
            }
        }
    }

    return null;
}
