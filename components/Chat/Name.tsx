interface IProps {
    children: React.ReactNode;
}

export default function Name({ children }: IProps) {
    return <h1 className="font-semibold text-white/90 text-sm sm:text-base">{children}</h1>;
}
