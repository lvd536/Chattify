import Image from "next/image";
import mark from "@/public/mark.svg";
import { deleteMessage } from "@/utils/chat";

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
                    <div className="flex justify-between items-center">
                        <p className="max-w-100 text-justify text-wrap break-all">
                            {text}
                        </p>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#fe5858"
                            width={16}
                            height={16}
                            onClick={() => deleteMessage(id)}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                                    stroke="#ff4d4d"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
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
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#fe5858"
                            width={16}
                            height={16}
                            onClick={() => deleteMessage(id)}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                                    stroke="#ff4d4d"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
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
