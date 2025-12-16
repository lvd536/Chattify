interface IProps {
    setIsAudio: () => void;
}

export default function Main({ setIsAudio }: IProps) {
    return (
        <>
            <button
                className="p-2 bg-message-bg rounded-sm mr-2"
                onClick={setIsAudio}
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-icons"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M8 12H8.01M12 12H12.01M16 12H16.01M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            </button>
            <p className="flex items-center w-full h-11 py-4 px-6 rounded-xl bg-message-bg text-text/60">
                Record audio
            </p>
        </>
    );
}
