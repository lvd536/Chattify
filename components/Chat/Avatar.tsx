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
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full">
                    <p className="font-extrabold text-xl">{name[0]}</p>
                </div>
            )}
        </>
    );
}
