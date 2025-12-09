import { deleteChat, deleteChatHistory } from "@/utils/chat";
import Trash from "./Trash";

interface IProps {
    chatId: string;
}

export default function Actions({ chatId }: IProps) {
    return (
        <div className="absolute flex flex-col gap-1 top-16 right-0 w-3/8 min-w-35 h-20 p-2 bg-message-bg rounded-sm z-2 animate-slide-in select-none">
            <button
                className="flex items-center gap-2 py-1 px-2 w-full bg-chat-bg hover:bg-chat-bg/80 transition-bg duration-300 rounded-sm"
                onClick={() => deleteChat(chatId)}
            >
                <Trash />
                <p>Delete chat</p>
            </button>
            <button
                className="flex items-center gap-2 py-1 px-2 w-full bg-chat-bg hover:bg-chat-bg/80 transition-bg duration-300 rounded-sm"
                onClick={() => deleteChatHistory(chatId)}
            >
                <Trash />
                <p>Delete history</p>
            </button>
        </div>
    );
}
