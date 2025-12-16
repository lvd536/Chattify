"use client";
import { IUserClient } from "@/types/IUserClient";
import MemberControls from "./MemberControls";
import MemberInfo from "./MemberInfo";
import Header from "./Header";

interface IProps {
    members: IUserClient[] | null;
    uid: string;
    admins: string[];
    groupId: string;
}

export default function MemberList({ members, uid, admins, groupId }: IProps) {
    const isAdmin = admins.includes(uid);
    return (
        <div className="p-4">
            <Header membersCount={members?.length || 1} />
            <ul className="flex flex-col gap-2 bg-auth-input-bg/30 rounded-xl">
                {members?.map((member, index) => {
                    const isMemberAdmin = admins.includes(member.uid);
                    return (
                        <li
                            key={index}
                            className="flex items-center justify-between gap-3 border-b border-b-text/20 p-2 rounded-b-xl"
                        >
                            <MemberInfo
                                member={member}
                                uid={uid}
                                isAdmin={isMemberAdmin}
                            />
                            {isAdmin && (
                                <MemberControls
                                    groupId={groupId}
                                    isAdmin={isMemberAdmin}
                                    memberId={member.uid}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
