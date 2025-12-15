import { IGroup } from "@/types/IGroup";
import { db } from "@/utils/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export function useGroup(groupId: string) {
    const groupRef = doc(db, "groups", groupId);
    const [group, loading, error] = useDocumentData(groupRef);
    return {
        group: group as IGroup,
        loading,
        error,
    };
}
