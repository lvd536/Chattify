"use client";
import { useGroup } from "@/hooks/useGroup";

interface IProps {
    groupId: string;
}

export default function Info({ groupId }: IProps) {
    const { group, loading, error } = useGroup(groupId);
    const paragraphStyle =
        "flex items-center w-full h-10 rounded-lg bg-edit-form-bg border border-text/40 text-text px-4 focus:ring-1 placeholder:text-edit-form-text transition-all duration-300 mb-2";
    return (
        <>
            {group ? (
                <div className="flex flex-col gap-1 px-4 my-4">
                    <h1 className="self-start font-semibold text-sm text-text/50 border-b border-b-text/20 w-full pb-1 mb-4">
                        Personal Information
                    </h1>

                    <p className="self-start text-text/80 text-sm font-medium text-nowrap">
                        Name
                    </p>
                    <p className={paragraphStyle}>{group.name}</p>
                    <p className="self-start text-text/80 text-sm font-medium text-nowrap">
                        Description
                    </p>
                    <p className={paragraphStyle}>{group.description}</p>
                </div>
            ) : loading ? (
                <>Loading...</>
            ) : error ? (
                <>Error: {error}</>
            ) : (
                <>Group not found</>
            )}
        </>
    );
}
