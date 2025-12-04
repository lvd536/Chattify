import NavBar from "@/components/NavBar/NavBar";
import ChatBody from "@/components/Chat/ChatBody";
import ChatHead from "@/components/Chat/ChatHead";
export default function page() {
    return (
        <div className="flex w-full h-screen">
            <NavBar />
            <div className="w-8/12">
                <ChatHead avatarUrl="" lastSeen="19:26" name="David Tumberg" />
                <ChatBody />
            </div>
        </div>
    );
}
