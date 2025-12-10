interface IProps {
    onClose: () => void;
    uploading: boolean;
    file: File | null;
    handleUpload(): Promise<void>;
}

export default function Buttons({
    file,
    handleUpload,
    onClose,
    uploading,
}: IProps) {
    return (
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
    );
}
