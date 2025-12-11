import Trash from "../Trash";
import Image from "next/image";
import mark from "@/public/mark.svg";
import AudioPlayer from "./AudioPlayer";
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
        <div className="w-67">
            <AudioPlayer src={text} />
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
                                className="absolute right-1 top-1 bottom-0"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
