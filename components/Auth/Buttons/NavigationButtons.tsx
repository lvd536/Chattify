"use client";

import Link from "next/dist/client/link";
import EmailButton from "./EmailButton";
import GoogleButton from "./GoogleButton";

export default function NavigationButtons() {
    return (
        <div className="flex flex-col gap-2">
            <Link href={"auth/google"}>
                <GoogleButton />
            </Link>
            <Link href={"auth/email"}>
                <EmailButton />
            </Link>
        </div>
    );
}
