import Image from "next/image";
import mark from "@/public/mark.svg";

interface IProps {
    text: string;
    time: string;
    isUser: boolean;
    read: boolean | undefined;
}

export default function Message({ text, time, isUser, read }: IProps) {
    const messageStyle = isUser
        ? "self-end bg-user-message-bg rounded-xl p-2 w-fit min-w-25 max-w-4/6"
        : "bg-message-bg rounded-xl p-2 min-w-25 w-fit max-w-4/6";
    const timeStyle = isUser
        ? "text-white/90 text-xs"
        : "text-[#707991] text-xs";
    return (
        <li className={messageStyle}>
            <p className="max-w-100 text-justify text-wrap break-all">{text}</p>
            <div className="flex justify-end gap-2">
                <p className={timeStyle}>{time}</p>
                <div className="items-center relative self-end">
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
        </li>
    );
}
