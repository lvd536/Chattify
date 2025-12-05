"use client";

import { useMemo } from "react";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import {
    useCollection,
    useCollectionData,
} from "react-firebase-hooks/firestore";
import { db } from "@/utils/firebase";
import type { IUser } from "@/types/IUser";
import type { IMessage } from "@/types/IMessage";

export function useSearchUsers(search: string) {
    const start = search ? search.toLowerCase() : "";
    const end = start ? start + "\uf8ff" : "";
    const usersRef = collection(db, "users");

    const q1 = start
        ? query(
              usersRef,
              where("username", ">=", start),
              where("username", "<=", end),
              limit(10)
          )
        : null;

    const q2 = start
        ? query(
              usersRef,
              where("displayName", ">=", start),
              where("displayName", "<=", end),
              limit(10)
          )
        : null;

    const [snap1, loading1, error1] = useCollection(q1);
    const [snap2, loading2, error2] = useCollection(q2);

    const users: IUser[] = useMemo(() => {
        const docs = [...(snap1?.docs ?? []), ...(snap2?.docs ?? [])];
        const mapped = docs.map(
            (d) => ({ uid: d.id, ...(d.data() as Omit<IUser, "uid">) } as IUser)
        );
        const uniq: IUser[] = [];
        const seen = new Set<string>();
        for (const u of mapped) {
            if (!seen.has(u.uid)) {
                seen.add(u.uid);
                uniq.push(u);
            }
        }
        return uniq;
    }, [snap1, snap2]);

    return {
        users,
        loading: Boolean(loading1 || loading2),
        error: error1 ?? error2 ?? null,
    };
}

export function useChatMessages(chatId: string) {
    const q = chatId
        ? query(
              collection(db, "messages"),
              where("chatId", "==", chatId),
              orderBy("createdAt", "asc")
          )
        : null;

    const [snap, loading, error] = useCollection(q);
    const messages =
        (snap?.docs.map((d) => ({ id: d.id, ...d.data() })) as IMessage[]) ??
        [];

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
        ? ({ id: snap.docs[0].id, ...snap.docs[0].data() } as IMessage)
        : null;
    return message;
}

export function useParticipant(participantUid: string) {
    const q = query(
        collection(db, "users"),
        where("uid", "==", participantUid)
    );
    const [snap] = useCollectionData(q);
    const participant = snap && (snap[0] as IUser);

    return participant;
}
