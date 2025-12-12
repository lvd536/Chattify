interface IProps {
    remaining: number;
}

export default function Recording({ remaining }: IProps) {
    return (
        <p className="flex items-center justify-between w-full h-11 py-4 px-6 rounded-xl bg-message-bg">
            <span className="text-text/60">Recording...</span>
            <span className="text-text/60 text-sm mr-5">{`${remaining} seconds remain`}</span>
        </p>
    );
}
