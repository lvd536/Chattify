import { User } from "firebase/auth";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    setOnSearch: Dispatch<SetStateAction<boolean>>;
}

export default function NavHead({
    searchValue,
    setSearchValue,
    setOnSearch,
}: IProps) {
    useEffect(() => {
        if (searchValue.length <= 0) {
            setOnSearch(false);
        }
    }, [searchValue.length, setOnSearch]);

    return (
        <div className="flex gap-2 justify-center items-center mt-3 px-4">
            <form
                className="flex relative"
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    if (searchValue.length <= 0) return;
                    setOnSearch(true);
                }}
            >
                <input
                    type="search"
                    placeholder="Search..."
                    className="block h-8 p-2 lg:p-4 min-w-20 items-center rounded-lg bg-search-bar"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="block absolute right-1.5 top-0 bottom-0"
                >
                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 -0.5 25 25"
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
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                                stroke="#707991"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>{" "}
                            <path
                                d="M17.029 16.5295L19.5 19.0005"
                                stroke="#707991"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>{" "}
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    );
}
