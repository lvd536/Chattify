import ResetForm from "@/components/Profile/ResetForm";
import Link from "next/link";

export default function page() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full py-2 px-4 h-13 border-b border-b-white/30">
                <h1 className="font-bold">Change password</h1>
                <Link
                    href={"/home"}
                    className="flex items-center justify-center p-2 w-8 h-8 bg-chat-bg rounded-sm"
                >
                    X
                </Link>
            </div>
            <ResetForm />
        </div>
    );
}
