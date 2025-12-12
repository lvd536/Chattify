import { deleteMessage } from "@/utils/chat";
import TextMessage from "./Message/TextMessage";
import AudioMessage from "./Message/AudioMessage";
import ImageMessage from "./Message/ImageMessage";

interface IProps {
    text: string;
    time: string;
    isUser: boolean;
    id: string;
    read: boolean | undefined;
    type: "text" | "image" | "system" | undefined;
}

export default function Message({
    text,
    time,
    isUser,
    id,
    read,
    type,
}: IProps) {
    const messageStyle = isUser
        ? "self-end bg-user-message-bg rounded-xl p-2 w-fit min-w-25 max-w-4/6"
        : "bg-message-bg rounded-xl p-2 min-w-25 w-fit max-w-4/6";
    const timeStyle = isUser ? "text-text/90 text-xs" : "text-details text-xs";
    return (
        <li className={messageStyle}>
            {type === "text" ? (
                <TextMessage
                    timeStyle={timeStyle}
                    onClick={() => deleteMessage(id)}
                    read={read}
                    text={text}
                    time={time}
                />
            ) : type === "image" ? (
                <ImageMessage
                    timeStyle={timeStyle}
                    onClick={() => deleteMessage(id)}
                    read={read}
                    text={text}
                    time={time}
                />
            ) : (
                <AudioMessage
                    timeStyle={timeStyle}
                    onClick={() => deleteMessage(id)}
                    read={read}
                    text={text}
                    time={time}
                />
            )}
        </li>
    );
}
