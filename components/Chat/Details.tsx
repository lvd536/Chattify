interface IProps {
    children: React.ReactNode;
}

export default function Details({ children }: IProps) {
    return <p className="text-[14px] text-[#707991]">{children}</p>;
}
