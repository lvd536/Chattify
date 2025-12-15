import { deleteChatHistory } from "@/utils/chat";
import Trash from "../Trash";
import { deleteGroup, leaveGroup } from "@/utils/group";

interface IProps {
    groupId: string;
    uid: string;
    isAdmin: boolean;
}

export default function Actions({ groupId, uid, isAdmin }: IProps) {
    return (
        <div className="absolute flex flex-col gap-1 top-16 right-0 w-3/8 min-w-35 h-30 p-2 bg-message-bg rounded-sm z-2 animate-slide-in select-none">
            {isAdmin && (
                <>
                    <button
                        className="flex items-center gap-2 py-1 px-2 w-full bg-chat-bg hover:bg-chat-bg/80 transition-bg duration-300 rounded-sm"
                        onClick={() => deleteGroup(groupId)}
                    >
                        <Trash />
                        <p>Delete group</p>
                    </button>
                    <button
                        className="flex items-center gap-2 py-1 px-2 w-full bg-chat-bg hover:bg-chat-bg/80 transition-bg duration-300 rounded-sm"
                        onClick={() => deleteChatHistory(groupId)}
                    >
                        <Trash />
                        <p>Delete history</p>
                    </button>
                </>
            )}
            <button
                className="flex items-center gap-2 py-1 px-2 w-full bg-chat-bg hover:bg-chat-bg/80 transition-bg duration-300 rounded-sm"
                onClick={() => leaveGroup(groupId, uid)}
            >
                <Trash />
                <p>Leave from group</p>
            </button>
        </div>
    );
}
