import { getAudioDurationSeconds } from "@/utils/audio";
import { sendAudioMessage, uploadAudioToCloudinary } from "@/utils/chat";
import { useState, useRef, useEffect } from "react";

interface IProps {
    chatId: string;
    uid: string;
    setIsAudio: () => void;
}

const MAX_SECONDS = 30;

export default function AudioInput({ chatId, uid, setIsAudio }: IProps) {
    const [isAudioRecorded, setIsAudioRecorded] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<number>(MAX_SECONDS);
    const [recordedDuration, setRecordedDuration] = useState<number | null>(
        null
    );

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const stopTimeoutRef = useRef<number | null>(null);
    const tickIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (stopTimeoutRef.current)
                window.clearTimeout(stopTimeoutRef.current);
            if (tickIntervalRef.current)
                window.clearInterval(tickIntervalRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            }
        };
    }, []);

    async function startRecording() {
        try {
            if (!navigator.mediaDevices) {
                alert("Media devices not supported");
                throw new Error("Media devices not supported");
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, {
                    type: "audio/webm",
                });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
                setIsAudioRecorded(true);
                const duration = await getAudioDurationSeconds(blob);
                const rounded =
                    typeof duration === "number" && isFinite(duration)
                        ? Math.round(duration * 100) / 100
                        : null;
                setRecordedDuration(rounded);
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach((t) => t.stop());
                    streamRef.current = null;
                }
                if (stopTimeoutRef.current) {
                    window.clearTimeout(stopTimeoutRef.current);
                    stopTimeoutRef.current = null;
                }
                if (tickIntervalRef.current) {
                    window.clearInterval(tickIntervalRef.current);
                    tickIntervalRef.current = null;
                }
                setRemaining(MAX_SECONDS);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRemaining(MAX_SECONDS);

            stopTimeoutRef.current = window.setTimeout(() => {
                if (
                    mediaRecorderRef.current &&
                    mediaRecorderRef.current.state !== "inactive"
                ) {
                    mediaRecorderRef.current.stop();
                    stopRecording();
                }
            }, MAX_SECONDS * 1000);

            tickIntervalRef.current = window.setInterval(() => {
                setRemaining((prev) => {
                    const next = prev - 1;
                    return next >= 0 ? next : 0;
                });
            }, 1000);
        } catch (error) {
            console.error(
                "Error accessing microphone:",
                error instanceof Error ? error.message : error
            );
            setIsRecording(false);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            }
        }
    }

    function stopRecording() {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }
        if (stopTimeoutRef.current) {
            window.clearTimeout(stopTimeoutRef.current);
            stopTimeoutRef.current = null;
        }
        if (tickIntervalRef.current) {
            window.clearInterval(tickIntervalRef.current);
            tickIntervalRef.current = null;
        }
        setIsRecording(false);
        setRemaining(MAX_SECONDS);
    }

    function clearAudio() {
        setAudioURL(null);
        setIsAudioRecorded(false);
        setIsRecording(false);
        setRecordedDuration(null);
        mediaRecorderRef.current = null;
        chunksRef.current = [];
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (stopTimeoutRef.current) {
            window.clearTimeout(stopTimeoutRef.current);
            stopTimeoutRef.current = null;
        }
        if (tickIntervalRef.current) {
            window.clearInterval(tickIntervalRef.current);
            tickIntervalRef.current = null;
        }
        setRemaining(MAX_SECONDS);
    }

    async function handleUpload() {
        if (!chunksRef.current.length) return;
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        try {
            const url = await uploadAudioToCloudinary(
                blob,
                "dbnjplscn",
                "chattify-upload"
            );
            await sendAudioMessage(chatId, uid, url, recordedDuration || 1);
            clearAudio();
        } catch (err) {
            console.error("Upload or send failed", err);
        }
    }
    return (
        <div className="relative flex gap-2 items-center justify-between mb-2">
            {isAudioRecorded && audioURL ? (
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
            ) : isRecording ? (
                <p className="flex items-center justify-between w-full h-11 py-4 px-6 rounded-xl bg-message-bg">
                    <span className="text-white/60">Recording...</span>
                    <span className="text-white/60 text-sm mr-5">{`${remaining} seconds remain`}</span>
                </p>
            ) : (
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
                                    stroke="#8BABD8"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>
                    <p className="flex items-center w-full h-11 py-4 px-6 rounded-xl bg-message-bg text-white/60">
                        Record audio
                    </p>
                </>
            )}
            <button type="button" className="absolute top-0 bottom-0 right-4">
                {isAudioRecorded ? (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleUpload}
                    >
                        <path
                            d="M10.568 9.94977L3.03601 11.2058C2.94942 11.2202 2.86815 11.2572 2.80039 11.313C2.73263 11.3689 2.68077 11.4415 2.65001 11.5238L0.0530096 18.4808C-0.19499 19.1208 0.47401 19.7308 1.08801 19.4238L19.088 10.4238C19.2127 10.3615 19.3175 10.2658 19.3908 10.1472C19.4641 10.0287 19.503 9.89212 19.503 9.75277C19.503 9.61342 19.4641 9.47682 19.3908 9.3583C19.3175 9.23978 19.2127 9.14402 19.088 9.08177L1.08801 0.0817693C0.47401 -0.225231 -0.19499 0.385769 0.0530096 1.02477L2.65101 7.98177C2.68162 8.06418 2.73343 8.13707 2.8012 8.19307C2.86897 8.24908 2.9503 8.28623 3.03701 8.30077L10.569 9.55577C10.6154 9.56389 10.6574 9.58809 10.6876 9.62413C10.7179 9.66016 10.7345 9.70571 10.7345 9.75277C10.7345 9.79983 10.7179 9.84538 10.6876 9.88141C10.6574 9.91745 10.6154 9.94165 10.569 9.94977H10.568Z"
                            fill="#8BABD8"
                        />
                    </svg>
                ) : (
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                            if (isRecording) {
                                stopRecording();
                            } else {
                                startRecording();
                            }
                        }}
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z"
                                stroke="#8BABD8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                )}
            </button>
        </div>
    );
}
