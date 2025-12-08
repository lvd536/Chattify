import NavBar from "@/components/NavBar/NavBar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <div className="hidden sm:block w-full sm:w-4/12">
                <NavBar />
            </div>
            {children}
        </div>
    );
}
