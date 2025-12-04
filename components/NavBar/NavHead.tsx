export default function NavHead() {
    return (
        <div className="flex justify-between items-center mt-3 px-4">
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
            <input
                type="text"
                placeholder="Search..."
                className="h-8 p-4 items-center rounded-3xl bg-search-bar"
            />
        </div>
    );
}
