import Image from "next/image";

interface IProps {
    src: string;
    alt: string;
    name: string;
}
export default function Avatar({ src, alt, name }: IProps) {
    return (
        <>
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={96}
                    height={96}
                    className="rounded-full w-24 h-24 ring-3 ring-gray-500/50"
                />
            ) : (
                <div className="flex items-center justify-center w-24 h-24 bg-green-400 rounded-full ring-3 ring-gray-500/50">
                    <p className="font-extrabold text-4xl">{name[0]}</p>
                </div>
            )}
        </>
    );
}
