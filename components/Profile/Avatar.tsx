"use client";
import Image from "next/image";
import { auth } from "@/utils/firebase";
import Link from "next/link";

interface IProps {
    src: string;
    alt: string;
    name: string;
}
export default function Avatar({ src, alt, name }: IProps) {
    const handleSignOut = () => {
        auth.signOut();
    };
    return (
        <div className="relative">
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={96}
                    height={96}
                    className="rounded-full w-24 h-24 ring-3 ring-gray-500/50"
                />
            ) : (
                <div className="flex items-center justify-center w-24 h-24 bg-green-400 rounded-full ring-3 ring-gray-500/50">
                    <p className="font-extrabold text-4xl">{name[0]}</p>
                </div>
            )}
            <Link
                href={"/"}
                className="flex items-center justify-center absolute right-0 bottom-0 bg-audio-player/85 p-1 rounded-full"
                onClick={handleSignOut}
            >
                <svg
                    fill="#8babd8"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    id="sign-out-left-2"
                    data-name="Flat Color"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-icons"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            id="secondary"
                            d="M17,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H17a1,1,0,0,0,0-2Z"
                        ></path>
                        <path
                            id="primary"
                            d="M20,21H11a2,2,0,0,1-2-2V16a1,1,0,0,1,2,0v3h9V5H11V8A1,1,0,0,1,9,8V5a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2V19A2,2,0,0,1,20,21Z"
                        ></path>
                    </g>
                </svg>
            </Link>
        </div>
    );
}
