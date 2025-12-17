import EditForm from "@/components/Profile/EditForm/EditForm";
import Info from "@/components/Profile/Info";
import { getProfile } from "@/hooks/useProfile";

type Params = {
    uid: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { uid } = await params;
    const user = await getProfile(uid);
    return (
        <div className="flex flex-col items-center w-full bg-chat-bg">
            <Info user={user} />
            <EditForm user={user} />
        </div>
    );
}
