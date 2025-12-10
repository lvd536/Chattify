interface IProps {
    onClose: () => void;
}

export default function Head({ onClose }: IProps) {
    return (
        <header className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Загрузить изображение</h3>
            <button onClick={onClose}>✕</button>
        </header>
    );
}
