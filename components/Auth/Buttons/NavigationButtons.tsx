"use client";
import EmailButton from "./EmailButton";
import GoogleButton from "./GoogleButton";

export default function NavigationButtons() {
    return (
        <div className="flex flex-col gap-2">
            <GoogleButton />
            <EmailButton />
        </div>
    );
}
