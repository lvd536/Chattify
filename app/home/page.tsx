import NavBar from "@/components/NavBar/NavBar";

export default async function page() {
    return (
        <>
            <div className="w-8/12 hidden sm:block">
                <div className="flex h-full w-full items-center justify-center">
                    <p className="font-medium px-4 py-1 bg-chat-bg rounded-2xl">
                        Select a chat to start messaging
                    </p>
                </div>
            </div>
            <div className="sm:hidden w-full">
                <NavBar />
            </div>
        </>
    );
}
