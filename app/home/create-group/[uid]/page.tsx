import GroupCreation from "@/components/Group/Creation/Forms/GroupCreation/GroupCreation";
import Header from "@/components/Header";

type Params = {
    uid: string;
};

type IProps = {
    params: Promise<Params>;
};
export default async function page({ params }: IProps) {
    const { uid } = await params;
    return (
        <div className="w-full h-full">
            <Header>Group Creation</Header>
            <GroupCreation uid={uid} />
        </div>
    );
}
