import { getAudioDurationSeconds } from "@/utils/audio";
import {
    sendAudioMessage as sendChatAudioMessage,
    uploadAudioToCloudinary,
} from "@/utils/chat";
import { useState, useRef, useEffect } from "react";
import Upload from "./Buttons/Upload";
import Record from "./Buttons/Record";
import Main from "./Main";
import Recording from "./Recording";
import Audio from "./Audio";
import { sendAudioMessage as sendGroupAudioMessage } from "@/utils/group";

interface IProps {
    chatId: string;
    uid: string;
    setIsAudio: () => void;
    chatType: "chat" | "group";
}

const MAX_SECONDS = 30;

export default function AudioInput({
    chatId,
    uid,
    setIsAudio,
    chatType,
}: IProps) {
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
            if (chatType === "chat")
                await sendChatAudioMessage(
                    chatId,
                    uid,
                    url,
                    recordedDuration || 1
                );
            else
                await sendGroupAudioMessage(
                    chatId,
                    uid,
                    url,
                    recordedDuration || 1
                );
            clearAudio();
        } catch (err) {
            console.error("Upload or send failed", err);
        }
    }
    return (
        <div className="relative flex gap-2 items-center justify-between mb-2">
            {isAudioRecorded && audioURL ? (
                <Audio
                    audioURL={audioURL}
                    clearAudio={clearAudio}
                    isRecording={isRecording}
                />
            ) : isRecording ? (
                <Recording remaining={remaining} />
            ) : (
                <Main setIsAudio={setIsAudio} />
            )}
            <button type="button" className="absolute top-0 bottom-0 right-4">
                {isAudioRecorded ? (
                    <Upload handleUpload={handleUpload} />
                ) : (
                    <Record
                        isRecording={isRecording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                    />
                )}
            </button>
        </div>
    );
}
