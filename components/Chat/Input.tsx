import { useState } from "react";
import MessageInput from "./MessageInput";
import AudioInput from "./AudioInput";

interface IProps {
    chatId: string;
    uid: string;
}

export default function Input({ chatId, uid }: IProps) {
    const [isAudio, setIsAudio] = useState<boolean>(false);
    return (
        <>
            {isAudio ? (
                <AudioInput
                    chatId={chatId}
                    uid={uid}
                    setIsAudio={() => setIsAudio(false)}
                />
            ) : (
                <MessageInput
                    chatId={chatId}
                    uid={uid}
                    setIsAudio={() => setIsAudio(true)}
                />
            )}
        </>
    );
}
