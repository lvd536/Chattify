import Image from "next/image";

interface IProps {
    setDragOver: (value: React.SetStateAction<boolean>) => void;
    onDrop: (e: React.DragEvent<Element>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    openFilePicker: () => void;
    setFile: (value: React.SetStateAction<File | null>) => void;
    previewUrl: string | null;
    setPreviewUrl: (value: React.SetStateAction<string | null>) => void;
    dragOver: boolean;
    file: File | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function Body({
    file,
    inputRef,
    onDrop,
    dragOver,
    onFileChange,
    openFilePicker,
    setPreviewUrl,
    previewUrl,
    setDragOver,
    setFile,
}: IProps) {
    return (
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
                            {Math.round((file?.size || 0) / 1024) / 1000} MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
