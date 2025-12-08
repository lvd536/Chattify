"use client";
import { markMessagesAsRead } from "@/utils/chat";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useChatMessages } from "@/hooks/useChat";

interface IProps {
    chatId: string;
    uid: string;
}
export default function ChatBody({ chatId, uid }: IProps) {
    const { messages, loading, error } = useChatMessages(chatId);
    if (loading) return <div className="p-10 text-center">Загрузка...</div>;
    if (error)
        return <div className="text-red-500">Ошибка: {error.message}</div>;
    if (messages) {
        const unreadMessagesIds = messages
            .filter((message) => message.senderId !== uid && !message.read)
            .map((message) => message.id);
        if (unreadMessagesIds.length > 0) {
            markMessagesAsRead(unreadMessagesIds);
        }
    }
    return (
        <div className="flex flex-col justify-end h-[calc(100vh-6vh)] w-full bg-chat-bg px-5 sm:px-15">
            <ul className="flex flex-col gap-4 py-5 chat-scroll">
                {messages.map((message) => {
                    const messageDate =
                        message.createdAt?.toDate().toDateString() !==
                        new Date().toDateString()
                            ? message.createdAt?.toDate().toDateString()
                            : message.createdAt?.toDate().toLocaleTimeString();
                    return (
                        <Message
                            key={message.id}
                            text={message.text || ""}
                            time={messageDate || ""}
                            isUser={message.senderId === uid}
                            read={message.read}
                        />
                    );
                })}
            </ul>
            <MessageInput chatId={chatId} uid={uid} />
        </div>
    );
}
