import Image from "next/image";
import mark from "@/public/mark.svg";

interface IProps {
    text: string;
    time: string;
    isUser: boolean;
}

export default function Message({ text, time, isUser }: IProps) {
    const messageStyle = isUser
        ? "self-end bg-user-message-bg rounded-xl p-2 w-fit min-w-25 max-w-4/6"
        : "bg-message-bg rounded-xl p-2 min-w-25 w-fit max-w-4/6";
    const timeStyle = isUser
        ? "text-white/90 text-xs"
        : "text-[#707991] text-xs";
    return (
        <li className={messageStyle}>
            <p className="max-w-100 text-justify">{text}</p>
            <div className="flex justify-end gap-2">
                <p className={timeStyle}>{time}</p>
                <Image alt="" src={mark}></Image>
            </div>
        </li>
    );
}
