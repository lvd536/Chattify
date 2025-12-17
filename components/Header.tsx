import Link from "next/link";
import { routes } from "@/utils/consts";
interface IProps {
    children: React.ReactNode;
}

export default function Header({ children }: IProps) {
    return (
        <div className="flex items-center justify-between w-full py-2 px-4 h-13 border-b border-b-white/30">
            <h1 className="font-bold">{children}</h1>
            <Link
                href={routes.home.get.path}
                className="flex items-center justify-center p-2 w-8 h-8 bg-chat-bg rounded-sm"
            >
                X
            </Link>
        </div>
    );
}
