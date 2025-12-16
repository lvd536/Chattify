import EditForm from "@/components/Group/Management/EditForm";
import Header from "@/components/Header";
import Image from "next/image";
import { getGroup, getGroupParticipants } from "@/utils/group";
import MemberList from "@/components/Group/Management/MemberList";
import Info from "@/components/Group/Management/Info";
import { IUser } from "@/types/IUser";
import { IUserClient } from "@/types/IUserClient";

type Params = {
    id: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { id } = await params;
    const [groupId, uid] = id.split("_");
    const group = await getGroup(groupId);
    const membersRaw = await getGroupParticipants(groupId);
    const members = membersRaw ? membersRaw.map(serializeUser) : null;
    function serializeUser(user: IUser): IUserClient {
        return {
            uid: user.uid,
            displayName: user.displayName,
            username: user.username,
            photoURL: user.photoURL,
            email: user.email,
            createdAt: user.createdAt ? user.createdAt.toMillis() : null,
            lastSeen: user.lastSeen ? user.lastSeen.toMillis() : null,
        };
    }
    const isAdmin = group?.admins.includes(uid);
    return (
        <div className="w-full sm:w-8/12 h-dvh">
            <Header>Group management</Header>
            <div className="flex w-full items-center justify-center self-center mt-5">
                {group && group.photoURL ? (
                    <Image
                        src={group.photoURL}
                        alt="Group image"
                        width={96}
                        height={96}
                        className="rounded-full w-24 h-24 ring-3 ring-gray-500/50"
                    />
                ) : (
                    <div className="flex items-center justify-center w-24 h-24 bg-green-400 rounded-full ring-3 ring-gray-500/50">
                        <p className="font-extrabold text-4xl">
                            {group?.name[0] || "G"}
                        </p>
                    </div>
                )}
            </div>
            {isAdmin ? (
                <EditForm
                    groupId={groupId}
                    name={group?.name || ""}
                    description={group?.description || ""}
                    photoURL={group?.photoURL || ""}
                />
            ) : (
                <Info groupId={groupId} />
            )}
            <MemberList
                members={members}
                uid={uid}
                admins={group?.admins || []}
                groupId={groupId}
            />
        </div>
    );
}
