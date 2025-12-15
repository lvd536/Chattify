import GroupBody from "@/components/Group/GroupBody";
import GroupHead from "@/components/Group/GroupHead";

type Params = {
    id: string;
};

type PageProps = {
    params: Promise<Params>;
};

export default async function page({ params }: PageProps) {
    const { id } = await params;
    const [groupId, uid] = id.split("_");
    return (
        <div className="w-full sm:w-8/12 h-dvh">
            <GroupHead
                uid={uid}
                groupId={groupId}
            />
            <GroupBody groupId={groupId} uid={uid} />
        </div>
    );
}
