import Trash from "../Trash";
import Image from "next/image";
import mark from "@/public/mark.svg";
interface IProps {
    text: string;
    time: string;
    timeStyle: string;
    onClick: () => void;
    read: boolean | undefined;
}

export default function TextMessage({
    onClick,
    read,
    text,
    time,
    timeStyle,
}: IProps) {
    return (
        <>
            <div className="flex justify-between items-start">
                <p className="max-w-100 text-justify text-wrap break-all">
                    {text}
                </p>
                <Trash onClick={onClick} />
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
    );
}
