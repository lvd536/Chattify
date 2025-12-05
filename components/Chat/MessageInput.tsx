import { sendMessage } from "@/utils/chat";
import { useState } from "react";

interface IProps {
    chatId: string;
    uid: string;
}

export default function MessageInput({ chatId, uid }: IProps) {
    const [message, setMessage] = useState<string>("");
    const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(chatId, uid, message);
        setMessage("");
    };
    return (
        <form
            action=""
            className="flex gap-2 items-center justify-between mb-5 mt-6"
            onSubmit={handleMessageSubmit}
        >
            <input
                type="text"
                name="inputText"
                id="inputText"
                placeholder="Message"
                className="w-full h-11 p-4 rounded-xl bg-message-bg"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <button
                type="submit"
                className="flex text-sm items-center h-11 p-4 w-fit rounded-xl bg-message-bg"
            >
                Submit
            </button>
        </form>
    );
}
