import { useState } from "react";
import MessageInput from "./Text/MessageInput";
import AudioInput from "./Audio/AudioInput";

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
