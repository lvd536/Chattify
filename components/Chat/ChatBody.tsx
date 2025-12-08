"use client";
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
    return (
        <div className="flex flex-col justify-end h-[calc(100vh-64px)] w-full bg-chat-bg px-20 overflow-x-hidden">
            <ul className="flex flex-col gap-4 chat-scroll">
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
                        />
                    );
                })}
            </ul>
            <MessageInput chatId={chatId} uid={uid} />
        </div>
    );
}
