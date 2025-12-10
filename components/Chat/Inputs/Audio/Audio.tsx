interface IProps {
    audioURL: string;
    clearAudio: () => void;
    isRecording: boolean;
}

export default function Audio({ audioURL, clearAudio, isRecording }: IProps) {
    return (
        <div className="flex items-center justify-center w-full h-11 py-4 px-11 rounded-xl">
            <button
                type="button"
                onClick={clearAudio}
                disabled={isRecording}
                aria-label="Clear audio"
                className="p-2 bg-message-bg rounded-sm mr-2"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M9 9L15 15"
                            stroke="#8BABD8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15 9L9 15"
                            stroke="#8BABD8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="#8BABD8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            </button>
            <audio
                controls
                src={audioURL}
                className="w-full h-10 bg-message-bg rounded-xl"
            />
        </div>
    );
}
