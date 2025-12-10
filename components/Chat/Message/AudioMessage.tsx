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
export default function AudioMessage({
    onClick,
    read,
    text,
    time,
    timeStyle,
}: IProps) {
    return (
        <div>
            <audio controls src={text} className="h-10 mb-2"></audio>
            <div className="flex items-center justify-end gap-2">
                <div className="flex w-full items-center justify-between">
                    <Trash onClick={onClick} />
                    <div className="flex gap-2 items-center relative">
                        <p className={timeStyle}>{time}</p>
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
        </div>
    );
}
