import Image from "next/image";
import mark from "@/public/mark.svg";
import { deleteMessage } from "@/utils/chat";
import Trash from "./Trash";

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
    const timeStyle = isUser
        ? "text-white/90 text-xs"
        : "text-[#707991] text-xs";
    return (
        <li className={messageStyle}>
            {type === "text" ? (
                <>
                    <div className="flex justify-between items-start">
                        <p className="max-w-100 text-justify text-wrap break-all">
                            {text}
                        </p>
                        <Trash onClick={() => deleteMessage(id)} />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <p className={timeStyle}>{time}</p>
                        <div className="items-center relative">
                            <Image alt="" src={mark} />
                            {read && (
                                <Image
                                    alt=""
                                    src={mark}
                                    className="absolute left-1 top-0 bottom-0"
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Image src={text} alt="" width={300} height={300} />
                    <div className="flex items-center justify-between gap-2 mt-2">
                        <Trash onClick={() => deleteMessage(id)} />
                        <div className="flex items-center gap-2">
                            <p className={timeStyle}>{time}</p>
                            <div className="items-center relative">
                                <Image alt="" src={mark} />
                                {read && (
                                    <Image
                                        alt=""
                                        src={mark}
                                        className="absolute left-1 top-0 bottom-0"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}
