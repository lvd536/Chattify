interface IProps {
    children: React.ReactNode;
    messagesCount?: number;
}

export default function Name({ children, messagesCount }: IProps) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-text/90 text-sm sm:text-base">
                {children}
            </h1>
            {messagesCount !== 0 && messagesCount && (
                <p className="flex items-center justify-center text-xs w-5 h-5 bg-blue-500 rounded-full">
                    {messagesCount}
                </p>
            )}
        </div>
    );
}
