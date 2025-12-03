import Link from "next/link";

export default function EmailButton() {
    return (
        <Link
            href={"auth"}
            className="flex min-w-[232px] items-center justify-center overflow-hidden rounded-lg h-12 px-5 tracking-[0.015em] w-full gap-2 border border-gray-200 hover:bg-blue-300/10 transition-colors"
        >
            Войти через email
        </Link>
    );
}
