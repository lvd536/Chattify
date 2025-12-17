"use client";
import { deleteChat } from "@/utils/chat";
import { routes } from "@/utils/consts";
import { useRouter } from "next/navigation";

interface IProps {
    chatId: string;
}

export default function DeleteButton({ chatId }: IProps) {
    const router = useRouter();
    const handleDelete = () => {
        try {
            deleteChat(chatId);
            router.push(routes.home.get.path);
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };
    return (
        <button
            className="font-semibold bg-red-400 rounded-lg w-40 h-10"
            onClick={handleDelete}
        >
            Delete chat
        </button>
    );
}
