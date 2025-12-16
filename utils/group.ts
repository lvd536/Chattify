import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    writeBatch,
    deleteDoc,
    arrayRemove,
    getDoc,
    setDoc,
    arrayUnion,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { IUser } from "@/types/IUser";
import { IGroup } from "@/types/IGroup";

export async function getUsers(uids: string[]): Promise<IUser[]> {
    if (!uids.length) return [];

    const chunks: string[][] = [];
    for (let i = 0; i < uids.length; i += 10) {
        chunks.push(uids.slice(i, i + 10));
    }

    const users: IUser[] = [];

    for (const chunk of chunks) {
        const q = query(collection(db, "users"), where("uid", "in", chunk));

        const snap = await getDocs(q);

        snap.forEach((doc) => {
            users.push(doc.data() as IUser);
        });
    }
    console.log(users);
    return users;
}

export async function getGroupParticipants(
    groupId: string
): Promise<IUser[] | null> {
    const groupRef = doc(db, "groups", groupId);

    const snap = await getDoc(groupRef);
    if (snap) {
        const data = snap.data();
        if (!data) return null;
        if (data.members < 1) return null;
        const users = await getUsers(data.members);
        if (users) return users;
    }

    return null;
}

export async function createGroup(groupData: object) {
    const groupObj = {
        ...groupData,
        createdAt: serverTimestamp(),
    } as IGroup;
    const group = await addDoc(collection(db, "groups"), groupObj);
    if (group) return group.id;
    return false;
}

export async function sendTextMessage(
    groupId: string,
    senderId: string,
    message: string
) {
    const newMessage = {
        groupId: groupId,
        senderId: senderId,
        text: message,
        type: "text",
        createdAt: serverTimestamp(),
        deleted: false,
        read: false,
    };
    const result = await addDoc(collection(db, "messages"), newMessage);
    if (result) {
        await updateDoc(doc(db, "groups", groupId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: message,
        });
    }
}

export async function sendImageMessage(
    groupId: string,
    senderId: string,
    cloudinaryURL: string
) {
    const newMessage = {
        groupId: groupId,
        senderId: senderId,
        text: cloudinaryURL,
        type: "image",
        createdAt: serverTimestamp(),
        deleted: false,
        read: false,
    };
    const result = await addDoc(collection(db, "messages"), newMessage);
    if (result) {
        await updateDoc(doc(db, "groups", groupId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: "image",
        });
    }
}

export async function sendAudioMessage(
    groupId: string,
    senderId: string,
    cloudinaryURL: string,
    duration: number
) {
    const newMessage = {
        groupId: groupId,
        senderId: senderId,
        text: cloudinaryURL,
        type: "audio",
        duration: duration,
        createdAt: serverTimestamp(),
        deleted: false,
        read: false,
    };
    const result = await addDoc(collection(db, "messages"), newMessage);
    if (result) {
        await updateDoc(doc(db, "groups", groupId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: "voice message",
        });
    }
}

export async function deleteGroup(groupId: string) {
    try {
        const confirmed = confirm("Are you sure to delete this group?");
        if (confirmed) await deleteDoc(doc(db, "groups", groupId));
    } catch (error) {
        console.error("Error deleting group: ", error);
    }
}

export async function deleteGroupHistory(groupId: string) {
    const confirmed = confirm("Are you sure to delete group history?");
    if (confirmed) {
        try {
            const messages = await getDocs(
                query(
                    collection(db, "messages"),
                    where("groupId", "==", groupId)
                )
            );
            const batch = writeBatch(db);
            messages.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            await updateDoc(doc(db, "groups", groupId), {
                lastMessageAt: null,
                lastMessageText: null,
            });
        } catch (error) {
            console.error("Error deleting group history: ", error);
        }
    }
}

export async function leaveGroup(groupId: string, uid: string): Promise<void> {
    const confirmed = confirm("Are you sure to leave this group?");
    if (!confirmed) return;

    const groupRef = doc(db, "groups", groupId);

    await updateDoc(groupRef, {
        members: arrayRemove(uid),
        admins: arrayRemove(uid),
    });

    const snap = await getDoc(groupRef);
    if (!snap.exists()) return;

    const data = snap.data();

    if (!data.members || data.members.length === 0) {
        await deleteDoc(groupRef);
    }

    if (!data.admins || (data.admins.length === 0 && data.members)) {
        await updateDoc(groupRef, {
            admins: data.members[0],
        });
    }
}

export async function getGroup(groupId: string) {
    try {
        const group = await getDoc(doc(db, "groups", groupId));
        if (group.exists()) {
            const groupData = group.data() as IGroup;
            return groupData;
        } else {
            console.error(
                "Group not found or you don't have access to this group"
            );
        }
    } catch (error) {
        console.error("Error fetching group data:", error);
    }
}

export async function updateGroupInfo(
    groupId: string,
    formData: {
        name: string;
        description: string;
        photoURL: string;
    }
) {
    try {
        const groupRef = doc(db, "groups", groupId);
        try {
            await setDoc(
                groupRef,
                {
                    ...formData,
                },
                { merge: true }
            );
        } catch (error) {
            console.error("Error updating user active status:", error);
        }
    } catch (error) {
        console.error("Error on updating group data:", error);
    }
}

export async function kickUserFromGroup(groupId: string, userId: string) {
    try {
        const confirmed = confirm("Are you sure to kick this user?");
        if (confirmed) {
            const groupRef = doc(db, "groups", groupId);
            await updateDoc(groupRef, {
                members: arrayRemove(userId),
                admins: arrayRemove(userId),
            });
        }
    } catch (error) {
        console.error("Error kicking user from group:", error);
    }
}

export async function promoteUserToAdmin(groupId: string, userId: string) {
    try {
        const confirmed = confirm(
            "Are you sure to promote this user to admin?"
        );
        if (confirmed) {
            const groupRef = doc(db, "groups", groupId);
            await updateDoc(groupRef, {
                admins: arrayUnion(userId),
            });
        }
    } catch (error) {
        console.error(
            "Error promoting user to admin in group:",
            groupId,
            error
        );
    }
}

export async function demoteUserFromAdmin(groupId: string, userId: string) {
    try {
        const confirmed = confirm(
            "Are you sure to demote this user from admin?"
        );
        if (confirmed) {
            const groupRef = doc(db, "groups", groupId);
            await updateDoc(groupRef, {
                admins: arrayRemove(userId),
            });
        }
    } catch (error) {
        console.error("Error kicking user from group:", error);
    }
}

export async function addMembersToGroup(groupId: string, members: string[]) {
    try {
        const groupRef = doc(db, "groups", groupId);
        await updateDoc(groupRef, {
            members: arrayUnion(...members),
        });
    } catch (error) {
        console.error("Error adding members to group:", groupId, error);
    }
}
