import ChatBody from "@/components/Chat/ChatBody";
import ChatHead from "@/components/Chat/ChatHead";
import { checkChatExists, getUser } from "@/utils/chat";

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
    const participant = await getUser(participantUid);
    return (
        <div className="w-full sm:w-8/12 h-dvh">
            <ChatHead
                participantUid={participantUid}
                uid={uid}
                chatId={chatId}
            />
            <ChatBody
                chatId={chatId}
                uid={uid}
                participantAvatarUrl={participant.photoURL || ""}
                participantName={
                    participant.displayName || participant.username || "P"
                }
            />
        </div>
    );
}
