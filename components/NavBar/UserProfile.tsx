import Link from "next/link";
import Avatar from "../Chat/Avatar";
import { useProfile } from "@/hooks/useProfile";

interface IProps {
    uid: string;
}

export default function UserProfile({ uid }: IProps) {
    const { user, loading } = useProfile(uid);
    return (
        <div
            className="flex justify-between items-center h-15 py-2 px-4"
            style={{ borderTop: "1px solid #ffffff33" }}
        >
            {user ? (
                <>
                    <div className="flex gap-2 items-center">
                        <Avatar
                            alt="User Avatar"
                            src={user[0].photoURL || ""}
                            name={user[0].displayName || ""}
                        />
                        <div className="flex flex-col items-start justify-between">
                            <h3 className="font-semibold text-sm">
                                {user[0].displayName}
                            </h3>
                            <p className="text-xs font-semibold text-[#707991]">
                                Online
                            </p>
                        </div>
                    </div>
                    <Link href={`/home/profile/${user[0].uid}`}>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g clipPath="url(#clip0_429_11066)">
                                    {" "}
                                    <path
                                        d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
                                        stroke="#707991"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>{" "}
                                </g>{" "}
                                <defs>
                                    {" "}
                                    <clipPath id="clip0_429_11066">
                                        {" "}
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0 0.000915527)"
                                        ></rect>{" "}
                                    </clipPath>{" "}
                                </defs>{" "}
                            </g>
                        </svg>
                    </Link>
                </>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <p>Error</p>
            )}
        </div>
    );
}
