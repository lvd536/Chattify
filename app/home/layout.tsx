import NavBar from "@/components/NavBar/NavBar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <NavBar />
            {children}
        </div>
    );
}
