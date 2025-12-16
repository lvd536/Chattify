import { deleteMessage } from "@/utils/chat";
import TextMessage from "./Message/TextMessage";
import AudioMessage from "./Message/AudioMessage";
import ImageMessage from "./Message/ImageMessage";
import Avatar from "./Avatar";

interface IProps {
    text: string;
    time: string;
    isUser: boolean;
    id: string;
    read: boolean | undefined;
    type: "text" | "image" | "system" | undefined;
    participantAvatarUrl: string;
    participantName: string;
}

export default function Message({
    text,
    time,
    isUser,
    id,
    read,
    type,
    participantAvatarUrl,
    participantName,
}: IProps) {
    const messageStyle = isUser
        ? "self-end bg-user-message-bg rounded-xl p-2 w-fit min-w-25 max-w-80"
        : "bg-message-bg rounded-xl p-2 min-w-25 w-fit max-w-80";
    const timeStyle = isUser ? "text-text/90 text-xs" : "text-details text-xs";
    return (
        <li className={`flex gap-2 ${isUser && " self-end"}`}>
            {!isUser && (
                <Avatar
                    alt="User photo"
                    name={participantName}
                    src={participantAvatarUrl}
                />
            )}
            <div className={messageStyle}>
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
            </div>
        </li>
    );
}
