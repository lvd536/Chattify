import { IGroup } from "@/types/IGroup";
import { IMessage } from "@/types/IMessage";
import { db } from "@/utils/firebase";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

export function useGroup(groupId: string) {
    const groupRef = doc(db, "groups", groupId);
    const [group, loading, error] = useDocumentData(groupRef);
    return {
        group: group as IGroup,
        loading,
        error,
    };
}

export function useGroupMessages(groupId: string) {
    const q = groupId
        ? query(
              collection(db, "messages"),
              where("groupId", "==", groupId),
              orderBy("createdAt", "asc")
          )
        : null;

    const [snap, loading, error] = useCollection(q);
    const messages =
        (snap?.docs.map((d) => ({ id: d.id, ...d.data() })) as IMessage[]) ??
        [];

    return { messages, loading, error };
}
