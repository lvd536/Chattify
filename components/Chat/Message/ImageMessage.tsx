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
export default function ImageMessage({
    onClick,
    read,
    text,
    time,
    timeStyle,
}: IProps) {
    return (
        <>
            <Image
                src={text}
                alt=""
                width={300}
                height={300}
                className="rounded-xl"
            />
            <div className="flex items-center justify-between gap-2 mt-2">
                <Trash onClick={onClick} />
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
    );
}
