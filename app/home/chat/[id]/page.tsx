import ChatBody from "@/components/Chat/ChatBody";
import ChatHead from "@/components/Chat/ChatHead";
import { checkChatExists } from "@/utils/chat";

type Params = {
    id: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { id } = await params;
    const [uid, participantUid] = id.split("_");
    const chatId = (await checkChatExists(uid, participantUid)) || "";
    return (
        <div className="w-full sm:w-8/12">
            <ChatHead participantUid={participantUid} chatId={chatId} />
            <ChatBody chatId={chatId} uid={uid} />
        </div>
    );
}
