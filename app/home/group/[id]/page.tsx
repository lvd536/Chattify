import GroupBody from "@/components/Group/GroupBody";
import GroupHead from "@/components/Group/GroupHead";
import { IUser } from "@/types/IUser";
import { IUserClient } from "@/types/IUserClient";
import { getGroupParticipants } from "@/utils/group";

type Params = {
    id: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { id } = await params;
    const [groupId, uid] = id.split("_");
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
    return (
        <div className="w-full sm:w-8/12 h-dvh">
            <GroupHead uid={uid} groupId={groupId} />
            <GroupBody groupId={groupId} uid={uid} members={members} />
        </div>
    );
}
