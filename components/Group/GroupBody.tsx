"use client";
import { markMessagesAsRead } from "@/utils/chat";
import Message from "../Message";
import Input from "../Inputs/Input";
import { useGroupMessages } from "@/hooks/useGroup";
import { IUserClient } from "@/types/IUserClient";

interface IProps {
    groupId: string;
    uid: string;
    members: IUserClient[] | null;
}
export default function GroupBody({ groupId, uid, members }: IProps) {
    const { messages, loading, error } = useGroupMessages(groupId);
    if (loading) return <div className="p-10 text-center">Загрузка...</div>;
    if (error || !members)
        return (
            <div className="text-red-500">
                Ошибка: {error?.message || "Cant get members"}
            </div>
        );
    if (messages) {
        const unreadMessagesIds = messages
            .filter((message) => message.senderId !== uid && !message.read)
            .map((message) => message.id);
        if (unreadMessagesIds.length > 0) {
            markMessagesAsRead(unreadMessagesIds);
        }
    }
    return (
        <div className="flex flex-col justify-end h-14/15 w-full bg-chat-bg px-5 sm:px-15">
            <ul className="flex flex-col gap-4 py-5 chat-scroll">
                {messages.map((message) => {
                    const messageDate =
                        message.createdAt?.toDate().toDateString() !==
                        new Date().toDateString()
                            ? message.createdAt?.toDate().toDateString()
                            : message.createdAt?.toDate().toLocaleTimeString();
                    const member = members.find(
                        (m) => m.uid === message.senderId
                    );
                    return (
                        <Message
                            key={message.id}
                            text={message.text || ""}
                            time={messageDate || ""}
                            isUser={message.senderId === uid}
                            id={message.id}
                            read={message.read}
                            type={message.type}
                            participantAvatarUrl={member?.photoURL || ""}
                            participantName={
                                member?.displayName || member?.username || ""
                            }
                        />
                    );
                })}
            </ul>
            <Input chatId={groupId} uid={uid} chatType="group" />
        </div>
    );
}
