"use client";
import { useState } from "react";
import ChatList from "./ChatList";
import NavHead from "./NavHead";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import UserList from "./UserList";
import Avatar from "../Chat/Avatar";
import Name from "../Chat/Name";
import Link from "next/link";

export default function NavBar() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [onSearch, setOnSearch] = useState<boolean>(false);
    const [user, loading, error] = useAuthState(auth);
    return (
        <div className="flex flex-col sm:w-4/12 h-screen border-r border-r-white/20">
            {loading && !user ? (
                <div>loading...</div>
            ) : !error && !loading && user ? (
                <>
                    <NavHead
                        searchValue={searchValue}
                        setOnSearch={setOnSearch}
                        setSearchValue={setSearchValue}
                    />
                    {onSearch ? (
                        <UserList searchValue={searchValue} uid={user!.uid} />
                    ) : (
                        <ChatList user={user!} />
                    )}
                    <div
                        className="flex justify-between items-center h-15 py-2 px-4"
                        style={{ borderTop: "1px solid #ffffff33" }}
                    >
                        <div className="flex gap-2 items-center">
                            <Avatar
                                alt="User Avatar"
                                src={user.photoURL || ""}
                                name={user.displayName || ""}
                            />
                            <div className="flex flex-col items-start justify-between">
                                <h3 className="font-semibold text-sm">
                                    {user.displayName}
                                </h3>
                                <p className="text-xs font-semibold text-[#707991]">
                                    Online
                                </p>
                            </div>
                        </div>
                        <Link href={`/home/profile/${user.uid}`}>
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
                    </div>
                </>
            ) : (
                <div>Error...</div>
            )}
        </div>
    );
}
