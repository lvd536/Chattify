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
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { IUser } from "@/types/IUser";
import { IChat } from "@/types/IChat";

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
                if (user) return user;
            }
        }
    }

    return null;
}

export async function checkChatExists(uid1: string, uid2: string) {
    const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", uid1)
    );

    const snap = await getDocs(q);

    const chat = snap.docs.find((doc) => {
        const p = doc.data().participants;
        return p.includes(uid2);
    });

    if (chat) return chat.id;

    return await createChat(uid1, uid2);
}

export async function createChat(uid1: string, uid2: string) {
    const chatObj = {
        createdAt: serverTimestamp(),
        lastMessageAt: "",
        lastMessageText: "",
        participants: [uid1, uid2],
    };
    const chat = await addDoc(collection(db, "chats"), chatObj);
    if (chat) return chat.id;
    return false;
}

export async function sendTextMessage(
    chatId: string,
    senderId: string,
    message: string
) {
    const newMessage = {
        chatId: chatId,
        senderId: senderId,
        text: message,
        type: "text",
        createdAt: serverTimestamp(),
        deleted: false,
        read: false,
    };
    const result = await addDoc(collection(db, "messages"), newMessage);
    if (result) {
        await updateDoc(doc(db, "chats", chatId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: message,
        });
    }
}

export async function sendImageMessage(
    chatId: string,
    senderId: string,
    cloudinaryURL: string
) {
    const newMessage = {
        chatId: chatId,
        senderId: senderId,
        text: cloudinaryURL,
        type: "image",
        createdAt: serverTimestamp(),
        deleted: false,
        read: false,
    };
    const result = await addDoc(collection(db, "messages"), newMessage);
    if (result) {
        await updateDoc(doc(db, "chats", chatId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: "image",
        });
    }
}

export async function sendAudioMessage(
    chatId: string,
    senderId: string,
    cloudinaryURL: string,
    duration: number
) {
    const newMessage = {
        chatId: chatId,
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
        await updateDoc(doc(db, "chats", chatId), {
            lastMessageAt: serverTimestamp(),
            lastMessageText: "voice message",
        });
    }
}

export async function markMessagesAsRead(messageIds: string[]) {
    const batch = writeBatch(db);

    const messagesCollectionRef = "messages";

    for (const messageId of messageIds) {
        const messageRef = doc(db, messagesCollectionRef, messageId);

        batch.update(messageRef, {
            read: true,
        });
    }
    try {
        await batch.commit();
    } catch (error) {
        console.error("Ошибка при пакетном обновлении сообщений: ", error);
    }
}

export async function deleteChat(chatId: string) {
    try {
        const confirmed = confirm("Are you shure to delete this chat?");
        if (confirmed) await deleteDoc(doc(db, "chats", chatId));
    } catch (error) {
        console.error("Error deleting chat: ", error);
    }
}

export async function deleteMessage(messageId: string) {
    try {
        const confirmed = confirm("Are you shure to delete this message?");
        if (confirmed) await deleteDoc(doc(db, "messages", messageId));
    } catch (error) {
        console.error("Error deleting message: ", error);
    }
}
export function uploadImageToCloudinary(
    file: File,
    cloudName: string,
    uploadPreset: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", uploadPreset);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const resp = JSON.parse(xhr.responseText);
                    const imageUrl = resp.secure_url || resp.url;
                    if (!imageUrl)
                        return reject(new Error("Ошибка при получении url"));
                    resolve(imageUrl);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(
                    new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`)
                );
            }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(fd);
    });
}

export function uploadAudioToCloudinary(
    blob: Blob,
    cloudName: string,
    uploadPreset: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
        const fd = new FormData();
        fd.append("file", blob);
        fd.append("upload_preset", uploadPreset);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const resp = JSON.parse(xhr.responseText);
                    const imageUrl = resp.secure_url || resp.url;
                    if (!imageUrl)
                        return reject(new Error("Ошибка при получении url"));
                    resolve(imageUrl);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(
                    new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`)
                );
            }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(fd);
    });
}

export async function deleteChatHistory(chatId: string) {
    const confirmed = confirm("Are you sure to delete chat history?");
    if (confirmed) {
        try {
            const messages = await getDocs(
                query(collection(db, "messages"), where("chatId", "==", chatId))
            );
            const batch = writeBatch(db);
            messages.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            await updateDoc(doc(db, "chats", chatId), {
                lastMessageAt: null,
                lastMessageText: null,
            });
        } catch (error) {
            console.error("Error deleting chat history: ", error);
        }
    }
}
