import Link from "next/link";

export default function BackToHome() {
    return (
        <Link href={"/home"}>
            <svg
                width="34px"
                height="34px"
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
                    <path
                        d="M14.5 17L9.5 12L14.5 7"
                        stroke="#949dac"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>{" "}
                </g>
            </svg>
        </Link>
    );
}
