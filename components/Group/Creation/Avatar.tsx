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
                    width={24}
                    height={24}
                    className="rounded-full w-5 h-5 sm:w-6 sm:h-6"
                />
            ) : (
                <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-green-400 rounded-full">
                    <p className="sm:font-extrabold text-xs sm:text-md">
                        {name[0]}
                    </p>
                </div>
            )}
        </>
    );
}
