export default function Logo() {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="purple_gradient"
                    x1="0"
                    y1="0"
                    x2="512"
                    y2="512"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8E2DE2" />
                    <stop offset="1" stopColor="#4A00E0" />
                </linearGradient>
            </defs>

            <circle cx="256" cy="256" r="230" fill="url(#purple_gradient)" />

            <path
                d="M256 120C176.5 120 112 177.3 112 248C112 288.6 134.8 324.7 170.7 348L158 392L208.6 369.8C223.4 374.5 239.3 377.2 256 376C335.5 376 400 318.7 400 248C400 177.3 335.5 120 256 120Z"
                fill="white"
                fillOpacity="0.2"
            />

            <path
                d="M266 160L216 256H256L236 336L306 226H256L266 160Z"
                fill="white"
                stroke="white"
                strokeWidth="10"
                strokeLinejoin="round"
            />
        </svg>
    );
}
