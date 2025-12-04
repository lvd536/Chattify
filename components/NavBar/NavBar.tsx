"use client";
import { useState } from "react";
import ChatList from "./ChatList";
import NavHead from "./NavHead";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

export default function NavBar() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [onSearch, setOnSearch] = useState<boolean>(false);
    const [user, loading, error] = useAuthState(auth);
    return (
        <div className="flex flex-col w-4/12 border-r border-r-white/20">
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
                        <ChatList user={user!} />
                    ) : (
                        <ChatList user={user!} />
                    )}
                </>
            ) : (
                <div>Error...</div>
            )}
        </div>
    );
}
