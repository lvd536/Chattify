import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sendImageMessage, uploadToCloudinary } from "@/utils/chat";
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
            const url = await uploadToCloudinary(
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
                <header className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        Загрузить изображение
                    </h3>
                    <button onClick={onClose}>✕</button>
                </header>

                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={
                        "mb-4 flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6" +
                        (dragOver
                            ? "border-blue-400 bg-white/5 p-6"
                            : "border-gray-200 p-6")
                    }
                >
                    <input
                        ref={inputRef}
                        onChange={onFileChange}
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />

                    {!previewUrl ? (
                        <>
                            <div className="text-center">
                                <p className="mb-2 text-sm">
                                    Перетащите изображение сюда или
                                </p>
                                <button
                                    onClick={openFilePicker}
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:opacity-95"
                                >
                                    Выбрать файл
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Поддерживается: jpg, png, gif
                            </p>
                        </>
                    ) : (
                        <div className="flex w-full items-start gap-4">
                            <Image
                                src={previewUrl}
                                alt="preview"
                                width={112}
                                height={112}
                                className="h-28 w-28 rounded object-cover"
                            />
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="truncate text-sm font-medium">
                                        {file?.name}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setPreviewUrl(null);
                                        }}
                                        className="text-sm text-red-500"
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600">
                                    {Math.round((file?.size || 0) / 1024) /
                                        1000}{" "}
                                    MB
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

                <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2 text-sm"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                        {uploading ? "Загружаем..." : "Отправить"}
                    </button>
                </div>
            </div>
        </div>
    );
}
