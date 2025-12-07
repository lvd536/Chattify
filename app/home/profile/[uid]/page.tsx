import Avatar from "@/components/Profile/Avatar";
import Link from "next/link";

type Params = {
    uid: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { uid } = await params;
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full py-2 px-4 h-13 border-b border-b-white/30">
                <h1 className="font-bold">Profile</h1>
                <Link
                    href={"/home"}
                    className="flex items-center justify-center p-2 w-8 h-8 bg-chat-bg rounded-sm"
                >
                    X
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
                <Avatar alt="" name="Display" src="" />
                <h1 className="font-bold text-lg mt-2">Display Name</h1>
                <p className="text-[#707991]">@username</p>
            </div>
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-8"
            >
                <h1 className="self-start font-semibold border-b border-b-white/30 w-full pb-3">
                    Personal Information
                </h1>
                <div className="flex items-center justify-between gap-4">
                    <input type="text" name="" id="" />
                    <input type="text" name="" id="" />
                </div>
                <textarea name="" id=""></textarea>
                {/* <h1></h1> -----------------> TODO: Implement this (Email change/add & phone change/add)
                <div>
                    <input type="email" name="" id="" />
                    <input type="phone" name="" id="" />
                </div> */}
            </form>
        </div>
    );
}
