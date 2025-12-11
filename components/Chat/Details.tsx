interface IProps {
    lastMessageAt?: string;
    children: React.ReactNode;
}

export default function Details({ children, lastMessageAt }: IProps) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-[14px] text-[#707991]">
                {children}
            </p>

            <p className="text-[9px] sm:text-[12px] text-[#707991]">
                {lastMessageAt}
            </p>
        </div>
    );
}
