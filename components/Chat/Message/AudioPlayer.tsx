import { useEffect, useRef, useState } from "react";

interface IProps {
    src: string;
}

export default function AudioPlayer({ src }: IProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);
    const animationRef = useRef<number>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            if (!progressBarRef.current) return;
            progressBarRef.current.max = audio.duration.toString();
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            if (!progressBarRef.current) return;
            progressBarRef.current.value = audio.currentTime.toString();
        };

        const handleEnded = () => {
            if (!animationRef.current) return;
            setIsPlaying(false);
            cancelAnimationFrame(animationRef.current);
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioRef.current.pause();
            if (!animationRef.current) return;
            cancelAnimationFrame(animationRef.current);
        }
    };

    const changePlayerCurrentTime = () => {
        if (!progressBarRef.current || !audioRef.current) return;
        audioRef.current.currentTime = parseInt(progressBarRef.current.value);
        setCurrentTime(parseInt(progressBarRef.current.value));
    };
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const whilePlaying = () => {
        if (!progressBarRef.current || !audioRef.current) return;
        progressBarRef.current.value = audioRef.current.currentTime.toString();
        setCurrentTime(audioRef.current.currentTime);
        animationRef.current = requestAnimationFrame(whilePlaying);
    };
    return (
        <div className="flex items-center justify-between mb-1">
            <audio ref={audioRef} src={src} preload="metadata" />

            <button
                onClick={togglePlayPause}
                className="flex items-center justify-center bg-audio-player p-2 rounded-full"
            >
                {isPlaying ? (
                    <svg
                        width="22"
                        height="22"
                        viewBox="-0.5 0 25 25"
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
                                d="M17 3.42004H7C4.79086 3.42004 3 5.2109 3 7.42004V17.42C3 19.6292 4.79086 21.42 7 21.42H17C19.2091 21.42 21 19.6292 21 17.42V7.42004C21 5.2109 19.2091 3.42004 17 3.42004Z"
                                stroke="#8BABD8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                ) : (
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
                                d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                                stroke="#8BABD8"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                )}
            </button>
            <div className="flex items-center gap-2 bg-audio-player p-2 rounded-full">
                <div className="">{formatTime(currentTime)}</div>
                <input
                    type="range"
                    className=""
                    defaultValue="0"
                    ref={progressBarRef}
                    onChange={changePlayerCurrentTime}
                />
                <div className="">{formatTime(duration)}</div>
            </div>
        </div>
    );
}
