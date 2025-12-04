import Message from "./Message";
import MessageInput from "./MessageInput";
export default function ChatBody() {
    return (
        <div className="flex flex-col justify-end h-[calc(100vh-64px)] w-full bg-chat-bg px-20 overflow-y-auto">
            <ul className="flex flex-col gap-4">
                <Message
                    text="OMG 😲 do you remember what you did last night
                                at the work night out?"
                    time="18:01"
                    isUser={false}
                />
                <Message
                    text="OMG 😲 do you remember what you did last night
                                at the work night out?"
                    time="18:26"
                    isUser={true}
                />
            </ul>
            <MessageInput />
        </div>
    );
}
