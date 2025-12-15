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
                    className="self-end rounded-full w-8 h-8 sm:w-11 sm:h-11"
                />
            ) : (
                <div className="flex self-end text-center items-center justify-center w-8 h-8 sm:w-11 sm:h-11 bg-green-400 rounded-full">
                    <p className="font-extrabold text-lg sm:text-xl">
                        {name[0]}
                    </p>
                </div>
            )}
        </>
    );
}
