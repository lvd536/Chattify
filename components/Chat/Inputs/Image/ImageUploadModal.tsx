import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sendImageMessage, uploadImageToCloudinary } from "@/utils/chat";
import Buttons from "./Buttons";
import Head from "./Head";
import Body from "./Body";
type Props = {
    chatId: string;
    uid: string;
    isOpen: boolean;
    onClose: () => void;
    cloudName?: string;
    uploadPreset?: string;
};

export default function ImageUploadModal({
    chatId,
    uid,
    isOpen,
    cloudName,
    onClose,
    uploadPreset,
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const CLOUD_NAME =
        cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET =
        uploadPreset ||
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
        "chattify-upload";

    useEffect(() => {
        if (!file) {
            setTimeout(() => setPreviewUrl(null));
            return;
        }
        const url = URL.createObjectURL(file);
        setTimeout(() => setPreviewUrl(url));
        return () => URL.revokeObjectURL(url);
    }, [file]);

    if (!isOpen) return null;

    function openFilePicker() {
        inputRef.current?.click();
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError(null);
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setError("Пожалуйста, выберите изображение (jpg/png/gif и т.д.)");
            return;
        }
        setFile(f);
    }

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        setError(null);
        const f = e.dataTransfer.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setError("Пожалуйста, перетащите изображение (jpg/png/gif и т.д.)");
            return;
        }
        setFile(f);
    }

    async function handleUpload() {
        setError(null);
        if (!file) {
            setError("Файл не выбран");
            return;
        }
        if (!CLOUD_NAME) {
            return;
        }

        setUploading(true);

        try {
            const url = await uploadImageToCloudinary(
                file,
                CLOUD_NAME,
                UPLOAD_PRESET
            );
            setUploading(false);
            await sendImageMessage(chatId, uid, url);
            onClose();
        } catch {
            setUploading(false);
            setError("Ошибка загрузки");
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative z-10 w-[80vh] max-h-[90vh] overflow-auto rounded-xl bg-chat-bg p-6 shadow-2xl">
                <Head onClose={onClose} />
                <Body
                    dragOver={dragOver}
                    file={file}
                    inputRef={inputRef}
                    onDrop={onDrop}
                    onFileChange={onFileChange}
                    openFilePicker={openFilePicker}
                    previewUrl={previewUrl}
                    setDragOver={setDragOver}
                    setFile={setFile}
                    setPreviewUrl={setPreviewUrl}
                />

                {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

                <Buttons
                    file={file}
                    handleUpload={handleUpload}
                    onClose={onClose}
                    uploading={uploading}
                />
            </div>
        </div>
    );
}
