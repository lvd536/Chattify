import Info from "@/components/Profile/Info";
import DeleteButton from "@/components/UserProfile/DeleteButton";
import { getUser } from "@/utils/chat";
import { routes } from "@/utils/consts";
import Link from "next/link";

type Params = {
    id: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { id } = await params;
    const [uid, participantUid, chatId] = id.split("_");
    const user = await getUser(participantUid);
    return (
        <div className="w-full h-dvh bg-chat-bg">
            <Info user={user} />
            <div className="flex items-center justify-center gap-4 mt-6">
                <Link
                    href={routes.home.chat.path + `${uid}_${participantUid}`}
                    className="flex items-center justify-center font-semibold bg-blue-500 rounded-lg w-40 h-10"
                >
                    Message
                </Link>
                <DeleteButton chatId={chatId} />
            </div>
            <div className="flex flex-col gap-4 mx-8 p-5 mt-15 bg-profile-bio rounded-lg">
                <h3 className="text-xs font-semibold text-text/70">ABOUT</h3>
                <p>{user.description || "no bio yet"}</p>
            </div>
        </div>
    );
}
